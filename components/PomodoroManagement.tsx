
import * as React from 'react'
import Authenticated from 'src/app/components/Authenticated';
import Button from 'src/jscommon/controls/Button'
import Hidden from 'src/jscommon/controls/Hidden'
import TextInput from 'src/jscommon/controls/TextInput'
import { PomodoroArc } from '../controls/PomodoroArc'
import { PomodoroControls } from '../controls/PomodoroControls'
import { emptyPomodoro, PomodoroIdb } from '../data/PomodoroModels'
import PomodoroInfoPanels from './pomodoroManagement/PomodoroInfoPanels';
import * as container from './pomodoroManagement/PomodoroManagementContainer'
import { connectContainer } from './pomodoroManagement/PomodoroManagementContainer'

type ThisProps = 
  container.StateProps<PomodoroIdb> 
  & container.ConnectedDispatch<PomodoroIdb>
  & container.AttributeProps

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

  this.onStart = this.onStart.bind(this)
  this.onStop = this.onStop.bind(this)
  this.onEdit = this.onEdit.bind(this)
  this.onDelete = this.onDelete.bind(this)

  this.props.loadItems!()
}

  public render () {
    const pomodoroInfoPanels = (
     <PomodoroInfoPanels 
        pomodoros={this.props.items}
        onStart={this.onStart}
        onStop={this.onStop}
        onDelete={this.onDelete}
        onEdit={this.onEdit}
      />)
    
  return (
    <Authenticated>
        <section className="blade listings is-primary">
          <div className="blade-title" >
            Pomodoros
          </div>
          <div className="blade-body pomodoros" >
            <div className="pomodoro-items">
              {pomodoroInfoPanels}
            </div>
          </div>
        </section>
        <section className="blade details" >
          <div className="blade-body" >
            <div className="box" >
              <p>Id: {this.state.pomodoro.id}</p>
              <Hidden
                name="id"
                value={this.state.pomodoro.id} />
              <TextInput
                inputType="text"
                label="Planned"
                name="planned"
                placeholder="Enter a value"
                size={50}
                value={this.state.pomodoro.planned}
                onChange={this.onPlannedChanged} />
              <TextInput
                inputType="text"
                label="Actual"
                name="actual"
                placeholder="Enter a value"
                size={50}
                value={this.state.pomodoro.actual}
                onChange={this.onActualChanged} />

              <Button onClick={this.onSubmitPressed} text="Save" />
              <Button onClick={this.onClearPressed} text="Clear" />
            </div>
            <div className="box">
              <PomodoroControls name="first_pomodoro" />
              <PomodoroArc guageId="first_pomodoro" />
            </div>      
          </div>
        </section>
    </Authenticated>)
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
  private onEdit (pomodoro:PomodoroIdb) { 
    return (event: React.SyntheticEvent<HTMLButtonElement>) => {
      event.preventDefault()
      this.setState({ ...this.state, pomodoro })    
    }
  }
  private onDelete (pomodoro:PomodoroIdb) {
    return (event: React.SyntheticEvent<HTMLButtonElement>) => {
      event.preventDefault()
      this.props.deleteItem!(pomodoro.id)
    }
  }
  private onStart (pomodoro:PomodoroIdb) {
    return (event: React.SyntheticEvent<HTMLButtonElement>) => {
      event.preventDefault()
      this.props.startPomodoro!(pomodoro)
    }      
  }
  private onStop (pomodoro:PomodoroIdb) {
    return (event: React.SyntheticEvent<HTMLButtonElement>) => {
      event.preventDefault()
      this.props.stopPomodoro!(pomodoro)
    }      
  }
}

// Export the react component
export default connectContainer("Pomodoros", PomodoroManagementComp, s => s.pomodoros)

