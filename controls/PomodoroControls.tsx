import * as React from 'react';
import { connect } from 'react-redux';
import Button from 'src/jscommon/controls/Button'
import * as container from './PomodoroControlsConnect'

type CombinedProps = container.StateProps & container.ConnectedDispatch & container.AttributeProps

const renderCounter:React.SFC<CombinedProps> = ({ pomodoroState, reset, start, stop }:CombinedProps) => {  
  const onClickStart = (e: React.SyntheticEvent<HTMLButtonElement>):void => {
    e.preventDefault()
    start!(undefined)
  }

  const onClickStop = (e: React.SyntheticEvent<HTMLButtonElement>):void => {
    e.preventDefault()
    stop!(undefined)
  }    

  const onClickReset = (e: React.SyntheticEvent<HTMLButtonElement>):void => {
    e.preventDefault()
    reset!()
  }    

  return <div>
    <Button onClick={onClickStart} text="Start" />
    <Button onClick={onClickStop} text="Stop" />
    <Button onClick={onClickReset} text="Reset" />
  </div>
}
  
export const PomodoroControls = 
  connect<{}, {}, container.AttributeProps>(container.mapStateToProps, container.mapDispatchToProps) (renderCounter)



