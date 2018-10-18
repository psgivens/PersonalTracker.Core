// import { combineReducers } from 'redux'
import { PomodoroEvent } from '../actions/PomodoroSaga';
import { initialPomodoroTimerState, PomodoroTimerState } from '../data/PomodoroModels';

export function pomodoroReducers(state:PomodoroTimerState = initialPomodoroTimerState, action: PomodoroEvent): PomodoroTimerState {
  switch(action.type) {
    case "POMODORO_TIMER_STARTED":
      return {
        remaining: 25 * 60,               
        timerId: action.timerId,
        type: "RUNNING"      
      } 
    case "POMODORO_TIMER_STOPPED":
      return {
        type: "NOT_RUNNING"      
      } 
    case "POMODORO_TICKED":
      const prev = state
      if (prev.type === "RUNNING") {
        return { ...prev, remaining: prev.remaining-1 }}      
      else { return state }
    default:
      return state
  }
}



