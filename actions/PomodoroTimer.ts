import { Dispatch } from 'redux'

import { PomodoroEvent } from './PomodoroSaga'

/************** Timer processing ***********************/
export interface ITimer {
    stopTimer: (timerId:number) => void
    startTimer: () => number     
}

export class PomodoroTimer implements ITimer {
    constructor (private dispatch: Dispatch<any>) {}
    public startTimer = (): number =>  window.setInterval(() => this.dispatch(this.tick()), 1000)
    public stopTimer = (timerId:number): void => window.clearInterval(timerId)
    private tick = (): PomodoroEvent => ({ type: 'POMODORO_TICKED' })
}
