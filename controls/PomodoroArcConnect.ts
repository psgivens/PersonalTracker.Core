import * as redux from 'redux';
import * as state from 'src/core/reducers'
import { PomodoroTimerState } from '../data/PomodoroModels';

export type AttributeProps = {} & {
  guageId: string 
}
  
export type StateProps = {} & {
  timerState?: PomodoroTimerState
}

export type ConnectedDispatch = {} & {
  triggerThing?: () => void
}

export const mapStateToProps = (state1: state.All, ownProps: AttributeProps): StateProps => {
  // const pomodoroTimerState:state.PomodoroTimerState = 
  //   state1.pomodoroTimers[ownProps.guageId] 
  //     ? state1.pomodoroTimers[ownProps.guageId] 
  //     : { type: "NOT_RUNNING"}
  return {
    timerState: state1.pomodoro    
  }
}

export const mapDispatchToProps = (dispatch: redux.Dispatch<any>): ConnectedDispatch => ({
    
})  
