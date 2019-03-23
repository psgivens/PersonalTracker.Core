
import * as React from 'react'
import Authenticated from 'src/app/components/Authenticated';
import { PomodoroIdb } from '../data/PomodoroModels'
import PomodoroEditor from './pomodoroManagement/PomodoroEditor'
import PomodoroInfoPanels from './pomodoroManagement/PomodoroInfoPanels'
import * as container from './pomodoroManagement/PomodoroManagementContainer'
import { connectContainer } from './pomodoroManagement/PomodoroManagementContainer'
import PomodoroRunner from './pomodoroManagement/PomodoroRunner'


type ThisProps = 
  container.StateProps<PomodoroIdb> 
  & container.ConnectedDispatch<PomodoroIdb>
  & container.AttributeProps

// TODO: Add error-boundaries
// https://reactjs.org/docs/error-boundaries.html

type ComponentState = {} & {
  redirect: string | void
}

class PomodoroManagementComp extends React.Component<ThisProps, ComponentState> {
  constructor (props:ThisProps) {
    super (props)
    this.state = {
      redirect: undefined
    }

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
        <section className="blade details" key={this.props.item ? this.props.item.id : 0} >
          <PomodoroRunner />
          <PomodoroEditor />          
        </section>
    </Authenticated>)
  }
  private onEdit (pomodoro:PomodoroIdb) { 
    return (event: React.SyntheticEvent<HTMLButtonElement>) => {
      event.preventDefault()
      this.props.selectItem!(pomodoro)
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

