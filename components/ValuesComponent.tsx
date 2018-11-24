
import * as React from 'react'
import Button from 'src/jscommon/controls/Button'
import * as container from './valuesComponent/valuesComponentContainer'
import { connectContainer } from './valuesComponent/valuesComponentContainer'


type ThisProps = 
  container.StateProps
  & container.ConnectedDispatch
  & container.AttributeProps


/*************** TODO Remove *******************/
const SecondStyle = {
  backgroundColor: "green"
}

/*************** end Remove *******************/

// TODO: Add error-boundaries
// https://reactjs.org/docs/error-boundaries.html


const ValuesComponent:React.SFC<ThisProps> = (props:ThisProps) => {
  const onGetValuesPressed = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault()
    props.getValues!()
  }

  return (
  <div className="container-fluid" >
    <section className="hero is-primary">
      <div className="hero-body" style={SecondStyle}>
        <p className="title" style={SecondStyle}>
          Pomodoro Management
        </p>
        <p className="subtitle">
          List and edit <strong>Pomodoros</strong>
        </p>
      </div>
    </section>    
    <section className="section">
      <table className="table">
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Values</td>
            <td>{props.values}</td>
          </tr>
        </tbody>
      </table>
    </section>
    <section className="section" >
      <div className="Data-entry" >
        <Button onClick={onGetValuesPressed} text="Get Values" />
      </div>
    </section>
  </div>)
  }

// Export the react component
export default connectContainer(ValuesComponent)


