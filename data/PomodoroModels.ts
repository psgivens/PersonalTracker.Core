
export type PomodoroIdb = {} & {
    id: number
    userId: string
    planned: string
    actual: string
    startTime: number
    version: number
}

export const createPomodoro = (
        userId:string, 
        planned:string, 
        actual:string="", 
        startTime:number=Date.now()):PomodoroIdb => ({    
    actual,
    id: Math.floor(Math.random() * 1000000000),
    planned,
    startTime,
    userId,
    version: 0
})

export type PomodoroTimerState = {
    type: "NOT_RUNNING"
  } | {
    type: "RUNNING"
    remaining: number
    timerId: number
  } | {
    type: "BREAK"
    length: "Short" | "Long"
    remaining: number
    timerId: number
  }

  
export const initialPomodoroTimerState:PomodoroTimerState = {
  type: "NOT_RUNNING"
}
