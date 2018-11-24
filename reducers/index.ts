import { combineReducers } from 'redux';
import { PomodoroTimerState } from 'src/core/data/PomodoroModels'
import { pomodoroReducers } from 'src/core/reducers/PomodoroReducers'
import { authenticationReducer, AuthenticationState, createInitialState as createAuthState } from 'src/jscommon/reducers/AuthenticationReducers'
import { createInitialState as createPomodoros, crudlReducer, CrudlState } from 'src/jscommon/reducers/CrudlReducers';
import { createInitialState as createPingState, pingReducer, PingState } from 'src/jscommon/reducers/PingReducers'
import { valuesReducers } from './valuesReducers';

export type All = {} & {
  auth: AuthenticationState
  ping: PingState
  pomodoros: CrudlState
  pomodoro: PomodoroTimerState
  values: string[]
}  

export const initialState:All = { 
  auth: createAuthState(),
  ping: createPingState(),
  pomodoro: { type: "NOT_RUNNING" },
  pomodoros: createPomodoros(),
  values: []
}

export const reducers = combineReducers( {
  auth: authenticationReducer,
  ping: pingReducer,
  pomodoro: pomodoroReducers,
  pomodoros: crudlReducer("Pomodoros"),
  values: valuesReducers
})


