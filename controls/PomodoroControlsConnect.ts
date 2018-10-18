import * as redux from 'redux';
import * as state from 'src/core/reducers';
import { PomodoroCommand, PomodoroCommands } from '../actions/PomodoroSaga';
import { PomodoroTimerState } from '../data/PomodoroModels';

export type AttributeProps = {} & {
    name: string
}
  
export type StateProps = {} & {
    pomodoroState?: PomodoroTimerState
}
  
export type ConnectedDispatch = {} & {
    start?: () => void
    stop?: () => void
    reset?: () => void
}

export const mapStateToProps = (state1: state.All, ownProps: AttributeProps): StateProps => ({
    pomodoroState: state1.pomodoro
})

export const mapDispatchToProps = (dispatch: redux.Dispatch<PomodoroCommand>): ConnectedDispatch => ({
    reset: () => dispatch(PomodoroCommands.reset()),    
    start: () => dispatch(PomodoroCommands.start()),
    stop: () => dispatch(PomodoroCommands.stop()),
})
