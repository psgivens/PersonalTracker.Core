import * as React from 'react';
import { PomodoroIdb } from "src/core/data/PomodoroModels";
import Button from 'src/jscommon/controls/Button';

type BasicProps = {} & {
    pomodoros: PomodoroIdb[]
    onStart: (pomodoro:PomodoroIdb) => (event: React.SyntheticEvent<HTMLButtonElement>) => void
    onStop: (pomodoro:PomodoroIdb) => (event: React.SyntheticEvent<HTMLButtonElement>) => void
    onEdit: (pomodoro:PomodoroIdb) => (event: React.SyntheticEvent<HTMLButtonElement>) => void
    onDelete: (pomodoro:PomodoroIdb) => (event: React.SyntheticEvent<HTMLButtonElement>) => void
}

const PomodoroInfoPanels: React.SFC<BasicProps> = ({pomodoros, onStart, onStop, onEdit, onDelete}:BasicProps) => {  
  return (<>
    {pomodoros.map((pomodoro:PomodoroIdb) => {
    const startButton = pomodoro.status === "Not started"
      ? <Button onClick={onStart(pomodoro)} text="Start" />
      : <> </>
    const stopButton = pomodoro.status === "Running"
      ? <Button onClick={onStop(pomodoro)} text="Stop" />
      : <> </>
    const actions = <> 
        <Button onClick={onEdit(pomodoro)} text="Edit" />
        <Button onClick={onDelete(pomodoro)} text="Delete" /> 
        { startButton }
        { stopButton }
      </>
    const startTime = 
      pomodoro.startTime
      ? (new Date(pomodoro.startTime)).toLocaleString()
      : "NA"

    return (
      <div 
        className="list-item"
        key={pomodoro.id}>
        {pomodoro.planned}, 
        {pomodoro.actual}, 
        {startTime},               
        {pomodoro.status}
        <br />
        {actions}
    </div>)      
  })} </>)
}

export default PomodoroInfoPanels;