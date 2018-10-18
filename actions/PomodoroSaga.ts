
import { Dispatch } from 'redux'
import { put, PutEffect, select, takeEvery } from 'redux-saga/effects'
import * as reducers from 'src/core/reducers'
import { initialPomodoroTimerState, PomodoroTimerState } from '../data/PomodoroModels'
import { ITimer, PomodoroTimer } from './PomodoroTimer'


/*** Commands ****/
export type PomodoroCommand = 
    { type: 'POMODORO_START_TIMER' }
    | { type: 'POMODORO_STOP_TIMER' }
    | { type: 'POMODORO_RESET_TIMER' }
    | { type: 'POMODORO_SAVE_META' }
    | { type: 'POMODORO_LOAD_META' }
    | { type: 'POMODORO_LOAD_REMOTE' }

export const PomodoroCommands = {
    getIp: ():PomodoroCommand => ({ type: 'POMODORO_LOAD_REMOTE' }),
    reset: ():PomodoroCommand => ({ type: 'POMODORO_RESET_TIMER' }),    
    start: ():PomodoroCommand => ({ type: 'POMODORO_START_TIMER' }),
    stop: ():PomodoroCommand => ({ type: 'POMODORO_STOP_TIMER' }),
}

/**************** Events ***********************/
export type PomodoroEvent = 
    { type: 'POMODORO_TICKED'} 
    | { type: 'POMODORO_RESET' } 
    | { type: 'POMODORO_TIMER_STARTED' 
        timerId: number } 
    | { type: 'POMODORO_TIMER_STOPPED' }
    | { type: 'POMODORO_LOCAL_SAVING', 
        version: number }
    | { type: 'POMODORO_LOCAL_SAVED' }
    | { type: 'POMODORO_LOCAL_LOADING',
        version: number }
    | { type: 'POMODORO_LOCAL_LOADED' }
    | { type: 'POMODORO_REMOTE_SAVING',
        version: number }
    | { type: 'POMODORO_REMOTE_SAVED' }
    | { type: 'POMODORO_REMOTE_LOADING',
        version: number }
    | { type: 'POMODORO_REMOTE_LOADED',
        myIp: string }

/******************** Sagas **************************/
function createRequests(timer:ITimer) {

    const putEvent = (event:PomodoroEvent): PutEffect<PomodoroEvent> => put(event)
    const getPomodoroState = (state:reducers.All): PomodoroTimerState => state.pomodoro ? state.pomodoro : initialPomodoroTimerState

    function *requestStartTimer(action: PomodoroCommand) {
        try {
            const state:PomodoroTimerState = yield select(getPomodoroState)
            if (state.type === "NOT_RUNNING") {
                const timerId = timer.startTimer()
                yield putEvent({
                    timerId,                        
                    type: 'POMODORO_TIMER_STARTED',
                })
            }
        } catch (e) {
//            console.log(e)
        }
    }

    function *requestStopTimer(action: PomodoroCommand) {
        try {
            const state:PomodoroTimerState = yield select(getPomodoroState)
            if (state.type === "RUNNING"){
                timer.stopTimer(state.timerId)
                yield putEvent({
                    type: 'POMODORO_TIMER_STOPPED'
                })
            }
        } catch (e) {
            // console.log(e)
        }
    }

    function *requestResetTimer(action: PomodoroCommand) {
        try {        
            const state:PomodoroTimerState = yield select(getPomodoroState)
            if (state.type === "RUNNING" ){
                yield requestStopTimer(action)
            }
            yield put({ type: 'POMODORO_RESET' })
        } catch (e) {
            // console.log(e)
        }
    }

    /*************** Register listeners ********************/
    function *saga(): Iterator<any> {
        yield takeEvery('POMODORO_STOP_TIMER', requestStopTimer)
        yield takeEvery('POMODORO_START_TIMER', requestStartTimer)    
        yield takeEvery('POMODORO_RESET_TIMER', requestResetTimer)
    }

    return saga
}

// So this is ugly. It defines DI and the generator as a return before creating the generator. 
const createPomodoroSaga = (dispatch: Dispatch<any>): (() => Iterator<any>) => 
    createRequests(new PomodoroTimer(dispatch))

export default createPomodoroSaga