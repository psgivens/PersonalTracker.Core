import * as redux from 'redux';
import * as state from 'src/core/reducers';
import { PomodoroCommand, PomodoroCommands } from '../actions/PomodoroSaga';
import { PomodoroIdb, PomodoroTimerState } from '../data/PomodoroModels';

export type AttributeProps = {} & {
    name: string
}
  
export type StateProps = {} & {
    pomodoroState?: PomodoroTimerState
}
  
export type ConnectedDispatch = {} & {
    start?: (item:PomodoroIdb | void) => void
    stop?: (item:PomodoroIdb | void) => void
    reset?: () => void
}

export const mapStateToProps = (state1: state.All, ownProps: AttributeProps): StateProps => ({
    pomodoroState: state1.pomodoro
})

export const mapDispatchToProps = (dispatch: redux.Dispatch<PomodoroCommand>): ConnectedDispatch => ({
    reset: () => dispatch(PomodoroCommands.reset()),    
    start: (item:PomodoroIdb | void) => dispatch(PomodoroCommands.start(item)),
    stop: (item:PomodoroIdb | void) => dispatch(PomodoroCommands.stop(item)),
})
