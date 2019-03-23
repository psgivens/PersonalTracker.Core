import * as React from 'react'
import Button from 'src/jscommon/controls/Button'
import Hidden from 'src/jscommon/controls/Hidden'
import TextInput from 'src/jscommon/controls/TextInput'
import { emptyPomodoro, PomodoroIdb } from '../../data/PomodoroModels'
import * as container from './pomodoroEditor/PomodoroEditorContainer'
import { connectContainer } from './pomodoroEditor/PomodoroEditorContainer'

type ThisProps = 
  container.StateProps<PomodoroIdb>
  & container.ConnectedDispatch<PomodoroIdb>
  & container.AttributeProps

// TODO: Add error-boundaries
// https://reactjs.org/docs/error-boundaries.html

type ComponentState = {} & {
  pomodoro: PomodoroIdb
}


class PomodoroEditorComp extends React.Component<ThisProps, ComponentState> {
  constructor (props:ThisProps) {
    super (props)
    this.state = {
      pomodoro: { ...this.props.item } as PomodoroIdb || emptyPomodoro
    }

  this.onPlannedChanged = this.onPlannedChanged.bind(this)
  this.onActualChanged = this.onActualChanged.bind(this)

  this.onSubmitPressed = this.onSubmitPressed.bind(this)
  this.onClearPressed = this.onClearPressed.bind(this)

  this.onStart = this.onStart.bind(this)
}

  public render () {
  return (<>
          <div className="blade-title" >
            Pomodoros
          </div>
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
          </div>
        </>)
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
  private onStart (pomodoro:PomodoroIdb) {
    return (event: React.SyntheticEvent<HTMLButtonElement>) => {
      event.preventDefault()
      this.props.startPomodoro!(pomodoro)
    }      
  }
}

// Export the react component
export default connectContainer("Pomodoros", PomodoroEditorComp, s => s.pomodoros)

