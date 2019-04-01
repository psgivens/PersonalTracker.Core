import { combineReducers } from 'redux';
import { PomodoroTimerState } from 'src/core/data/PomodoroModels'
import { pomodoroReducers } from 'src/core/reducers/PomodoroReducers'
import { authenticationReducer, AuthenticationState, createInitialState as createAuthState } from 'src/jscommon/reducers/AuthenticationReducers'
import { createInitialState as createCrudlItems, crudlReducer, CrudlState } from 'src/jscommon/reducers/CrudlReducers';
import { createInitialState as createPingState, pingReducer, PingState } from 'src/jscommon/reducers/PingReducers'
import { GroupIdb } from '../data/PeopleModels';
import { groupsReducers } from './peopleReducers';
import { valuesReducers } from './valuesReducers';

export type All = {} & {
  auth: AuthenticationState
  groups: GroupIdb []
  people: CrudlState
  ping: PingState  
  pomodoros: CrudlState
  pomodoro: PomodoroTimerState
  values: string[]  
}  

export const initialState = (accessToken:string):All => ( { 
  auth: createAuthState(accessToken),
  groups: [],
  people: createCrudlItems(),
  ping: createPingState(),
  pomodoro: { type: "NOT_RUNNING" },
  pomodoros: createCrudlItems(),
  values: []
})

export const reducers = combineReducers( {
  auth: authenticationReducer,
  groups: groupsReducers,
  people: crudlReducer("People"),
  ping: pingReducer,
  pomodoro: pomodoroReducers,
  pomodoros: crudlReducer("Pomodoros"),
  values: valuesReducers
})


