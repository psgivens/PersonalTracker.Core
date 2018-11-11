import { combineReducers } from 'redux';
import { PomodoroTimerState } from 'src/core/data/PomodoroModels'
import { pomodoroReducers } from 'src/core/reducers/PomodoroReducers'
import { createInitialState as createPomodoros, crudlReducer, CrudlState } from 'src/jscommon/reducers/CrudlReducers';
import { createInitialState as createPingState, pingReducer, PingState } from 'src/jscommon/reducers/PingReducers'

export type All = {} & {
  ping: PingState
  pomodoros: CrudlState
  pomodoro: PomodoroTimerState
}  

export const initialState:All = { 
  ping: createPingState(),
  pomodoro: { type: "NOT_RUNNING" },
  pomodoros: createPomodoros()
}

export const reducers = combineReducers( {
  ping: pingReducer,
  pomodoro: pomodoroReducers,
  pomodoros: crudlReducer("Pomodoros")
})


