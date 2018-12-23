import { combineReducers } from 'redux';
import { PomodoroTimerState } from 'src/core/data/PomodoroModels'
import { pomodoroReducers } from 'src/core/reducers/PomodoroReducers'
import { authenticationReducer, AuthenticationState, createInitialState as createAuthState } from 'src/jscommon/reducers/AuthenticationReducers'
import { createInitialState as createPomodoros, crudlReducer, CrudlState } from 'src/jscommon/reducers/CrudlReducers';
import { createInitialState as createPingState, pingReducer, PingState } from 'src/jscommon/reducers/PingReducers'
import { GroupIdb, PersonIdb } from '../data/PeopleModels';
import { groupsReducers, peopleReducers } from './peopleReducers';
import { valuesReducers } from './valuesReducers';

export type All = {} & {
  auth: AuthenticationState
  groups: GroupIdb []
  people: PersonIdb []
  ping: PingState  
  pomodoros: CrudlState
  pomodoro: PomodoroTimerState
  values: string[]  
}  

export const initialState:All = { 
  auth: createAuthState(),
  groups: [],
  people: [],
  ping: createPingState(),
  pomodoro: { type: "NOT_RUNNING" },
  pomodoros: createPomodoros(),
  values: []
}

export const reducers = combineReducers( {
  auth: authenticationReducer,
  groups: groupsReducers,
  people: peopleReducers,
  ping: pingReducer,
  pomodoro: pomodoroReducers,
  pomodoros: crudlReducer("Pomodoros"),
  values: valuesReducers
})


