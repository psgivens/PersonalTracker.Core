
import * as React from 'react'
import Button from 'src/jscommon/controls/Button'
import Hidden from 'src/jscommon/controls/Hidden'
import TextInput from 'src/jscommon/controls/TextInput'
import { PomodoroArc } from '../controls/PomodoroArc'
import { PomodoroControls } from '../controls/PomodoroControls'
import { emptyPomodoro, PomodoroIdb } from '../data/PomodoroModels'
import * as container from './pomodoroManagement/PomodoroManagementContainer'
import { connectContainer } from './pomodoroManagement/PomodoroManagementContainer'


type ThisProps = 
  container.StateProps<PomodoroIdb> 
  & container.ConnectedDispatch<PomodoroIdb>
  & container.AttributeProps


/*************** TODO Remove *******************/
const SecondStyle = {
  backgroundColor: "green"
}

/*************** end Remove *******************/

// TODO: Add error-boundaries
// https://reactjs.org/docs/error-boundaries.html

type ComponentState = {} & {
  pomodoro: PomodoroIdb,
  redirect: string | void
}

class PomodoroManagementComp extends React.Component<ThisProps, ComponentState> {
  constructor (props:ThisProps) {
    super (props)
    this.state = {
      pomodoro: emptyPomodoro,
      redirect: undefined
    }

  this.onPlannedChanged = this.onPlannedChanged.bind(this)
  this.onActualChanged = this.onActualChanged.bind(this)

  this.onSubmitPressed = this.onSubmitPressed.bind(this)
  this.onClearPressed = this.onClearPressed.bind(this)

  this.props.loadItems!()
}

  public render () {
    
  return (<div className="container-fluid" >
    <section className="hero is-primary">
      <div className="hero-body" style={SecondStyle}>
        <p className="title" style={SecondStyle}>
          Pomodoro Management
        </p>
        <p className="subtitle">
          List and edit <strong>Pomodoros</strong>
        </p>
      </div>
    </section>    
    <section className="section">
      <table className="table">
        <thead>
          <tr>
            <th>Planned</th>
            <th>Actual</th>
            <th>Start</th>
            <th>Actions</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>

        {this.props.items.map((pomodoro:PomodoroIdb) => {

          const onEdit = (event: React.SyntheticEvent<HTMLButtonElement>) => {
            event.preventDefault()
            this.setState({ ...this.state, pomodoro })    
          }
          const onDelete = (event: React.SyntheticEvent<HTMLButtonElement>) => {
            event.preventDefault()
            this.props.deleteItem!(pomodoro.id)
          }
          const onStart = (event: React.SyntheticEvent<HTMLButtonElement>) => {
            event.preventDefault()
            this.props.startPomodoro!(pomodoro)
          }      
          const onStop = (event: React.SyntheticEvent<HTMLButtonElement>) => {
            event.preventDefault()
            this.props.stopPomodoro!(pomodoro)
          }      
          const startButton = pomodoro.status === "Not started"
            ? <Button onClick={onStart} text="Start" />
            : <> </>
          const stopButton = pomodoro.status === "Running"
            ? <Button onClick={onStop} text="Stop" />
            : <> </>

          const actions = <> 
              <Button onClick={onEdit} text="Edit" />
              <Button onClick={onDelete} text="Delete" /> 
              { startButton }
              { stopButton }
            </>

          const startTime = 
            pomodoro.startTime
            ? (new Date(pomodoro.startTime)).toLocaleString()
            : "NA"

         return <tr key={pomodoro.id}>
            <td>{pomodoro.planned}</td>
            <td>{pomodoro.actual}</td>
            <td>{startTime}</td>               
            <td>{pomodoro.status}</td>
            <td>{actions}</td>
          </tr>})
        }
        </tbody>
      </table>
    </section>
    <section className="section" >
      <div className="Data-entry" >
        <p>Id: {this.state.pomodoro.id}</p>
        <Hidden
          name="id"
          value={this.state.pomodoro.id} />
        <TextInput
          inputType="text"
          label="Planned"
          name="planned"
          placeholder="Enter a value"
          value={this.state.pomodoro.planned}
          onChange={this.onPlannedChanged} />
        <TextInput
          inputType="text"
          label="Actual"
          name="actual"
          placeholder="Enter a value"
          value={this.state.pomodoro.actual}
          onChange={this.onActualChanged} />

        <Button onClick={this.onSubmitPressed} text="Save" />
        <Button onClick={this.onClearPressed} text="Clear" />
      </div>
    </section>
    <section className="section" >
      <div className="columns">
        <div className="column">
          <PomodoroControls name="first_pomodoro" />
        </div>
        <div className="column">
          <PomodoroArc guageId="first_pomodoro" />
        </div>
      </div>
    </section>
  </div>)
  }

  private onPlannedChanged (event: React.SyntheticEvent<HTMLInputElement>) {
    event.preventDefault()
    this.setState({ ...this.state, pomodoro: {...this.state.pomodoro, planned: event.currentTarget.value}})    
  }
  private onActualChanged (event: React.SyntheticEvent<HTMLInputElement>) {
    event.preventDefault()
    this.setState({ ...this.state, pomodoro: {...this.state.pomodoro, actual: event.currentTarget.value}})    
  }
  private onSubmitPressed (event: React.SyntheticEvent<HTMLButtonElement>) {
    event.preventDefault()
    this.props.addItem!(
      { ...this.state.pomodoro }
    )
  }
  private onClearPressed (event: React.SyntheticEvent<HTMLButtonElement>) {
    event.preventDefault()
    this.setState({ ...this.state, pomodoro: emptyPomodoro })    
  }
}

// Export the react component
export default connectContainer("Pomodoros", PomodoroManagementComp, s => s.pomodoros)

