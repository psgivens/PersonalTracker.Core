import * as React from 'react'
import { PomodoroArc } from '../../controls/PomodoroArc'
import { PomodoroControls } from '../../controls/PomodoroControls'
import { emptyPomodoro, PomodoroIdb } from '../../data/PomodoroModels'
import * as container from './pomodoroRunner/PomodoroRunnerContainer'
import { connectContainer } from './pomodoroRunner/PomodoroRunnerContainer'

type ThisProps = 
  container.StateProps<PomodoroIdb>
  & container.ConnectedDispatch<PomodoroIdb>
  & container.AttributeProps

// TODO: Add error-boundaries
// https://reactjs.org/docs/error-boundaries.html

type ComponentState = {} & {
  pomodoro: PomodoroIdb
}


class PomodoroRunnerComp extends React.Component<ThisProps, ComponentState> {
  constructor (props:ThisProps) {
    super (props)
    this.state = {
      pomodoro: { ...this.props.item } as PomodoroIdb || emptyPomodoro
    }

}

  public render () {
  return (<>
          <div className="blade-title" >
            <PomodoroControls name="first_pomodoro" />
          </div>
          <div className="blade-body" >          
            <div className="box">              
              <PomodoroArc guageId="first_pomodoro" />
            </div>      
          </div>
        </>)
  }

}

// Export the react component
export default connectContainer("Pomodoros", PomodoroRunnerComp, s => s.pomodoros)

