
import * as React from 'react';
import * as container from 'src/jscommon/components/CrudlContainer';
// import { connect } from 'react-redux';
import { connectContainer } from 'src/jscommon/components/CrudlContainer';
import Button from 'src/jscommon/controls/Button';
import Hidden from 'src/jscommon/controls/Hidden';
import TextInput from 'src/jscommon/controls/TextInput';
import { emptyPomodoro, PomodoroIdb } from '../data/PomodoroModels'

import { PomodoroArc } from '../controls/PomodoroArc'
import { PomodoroControls } from '../controls/PomodoroControls';


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
// const PomodoroManagementComp: React.SFC<ThisProps> = ( {pomodoros}:ThisProps ) => 
constructor (props:ThisProps) {
  super (props)
  this.state = {
    pomodoro: emptyPomodoro,
    redirect: undefined
  }
  // this.onActualChange = this.onActualChange.bind(this)
  // this.onPlannedChange = this.onPlannedChange.bind(this)
  // this.onClick = this.onClick.bind(this)

  this.onPlannedChanged = this.onPlannedChanged.bind(this)
  this.onActualChanged = this.onActualChanged.bind(this)

  this.onSubmitPressed = this.onSubmitPressed.bind(this)
  this.onClearPressed = this.onClearPressed.bind(this)

  this.props.loadItems!()
}

  public render () {
    const createActionButtons = (pomodoro:PomodoroIdb) => {
      const onEdit = (event: React.SyntheticEvent<HTMLButtonElement>) => {
        event.preventDefault()
        this.setState({ ...this.state, pomodoro })    
      }
      const onDelete = (event: React.SyntheticEvent<HTMLButtonElement>) => {
        event.preventDefault()
        this.props.deleteItem!(pomodoro.id)
      }
      return <> 
          <Button onClick={onEdit} text="Edit" />
          <Button onClick={onDelete} text="Delete" /> 
        </>
    }
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
          </tr>
        </thead>
        <tbody>

        {this.props.items.map((pomodoro:PomodoroIdb) =>
          <tr key={pomodoro.id}>
            <td>{pomodoro.planned}</td>
            <td>{pomodoro.actual}</td>
            <td>{(new Date(pomodoro.startTime)).toLocaleString()}</td>               
            <td>{createActionButtons(pomodoro)}</td>
          </tr>)}

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

// export default connect<{}, {}, container.AttributeProps>(container.mapStateToProps, container.mapDispatchToProps) (PomodoroManagementComp)


// Export the react component
export default connectContainer("Pomodoros", PomodoroManagementComp, s => s.pomodoros)
