import { Dispatch } from 'redux'

import { PomodoroIdb } from '../data/PomodoroModels';
import { PomodoroCommand } from './PomodoroSaga'

/************** Timer processing ***********************/
export interface ITimer {
    stopTimer: (timerId:number, item: PomodoroIdb | void) => void
    startTimer: (item: PomodoroIdb | void) => number     
}

export class PomodoroTimer implements ITimer {
    constructor (private dispatch: Dispatch<any>) {}
    public startTimer = (item: PomodoroIdb | void): number => 
        window.setInterval(() => 
        this.dispatch(this.tick(item)), 1000)
    public stopTimer = (timerId:number, item: PomodoroIdb | void): void => window.clearInterval(timerId)
    private tick = (item: PomodoroIdb | void): PomodoroCommand => ({ type: 'POMODORO_TICK_TIMER', item })
}
