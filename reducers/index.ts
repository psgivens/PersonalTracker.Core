import { combineReducers } from 'redux';
import { PomodoroTimerState } from 'src/core/data/PomodoroModels'
import { createInitialState, crudlReducer, CrudlState } from 'src/jscommon/reducers/CrudlReducers';

import { pomodoroReducers } from 'src/core/reducers/PomodoroReducers'

export const initialState:All = { 
  pomodoro: { type: "NOT_RUNNING" },
  pomodoros: createInitialState()
}

export type All = {} & {
  pomodoros: CrudlState,
  pomodoro: PomodoroTimerState
}  


export const reducers = combineReducers( {
  pomodoro: pomodoroReducers,
  pomodoros: crudlReducer("Pomodoros")
})


