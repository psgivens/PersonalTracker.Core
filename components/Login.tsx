
import * as React from 'react'
import Unauthenticated from 'src/app/components/Unauthenticated'
import * as container from 'src/jscommon/components/loginComponent/loginComponentContainer'
import Button from 'src/jscommon/controls/Button'
import TextInput from 'src/jscommon/controls/TextInput'

type ThisProps = 
  container.StateProps
  & container.ConnectedDispatch
  & container.AttributeProps

type ComponentState = {} & {
  username:string
  password:string
}

class LoginComponent extends React.Component<ThisProps, ComponentState> {
  constructor (props:ThisProps) {
    super (props)
    this.state = {
      password: "",
      username: ""
    }
    this.onUsernameChanged = this.onUsernameChanged.bind(this)
    this.onPasswordChanged = this.onPasswordChanged.bind(this)
    this.onSubmitPressed = this.onSubmitPressed.bind(this)
  }


  public render () {
  return (
    <Unauthenticated>
      <div className="container-fluid" >
        <section className="section">
          <div className="container box">
          <TextInput
              inputType="text"
              label="Username"
              name="username"
              placeholder="Enter a value"
              value={this.state.username}
              size={30}
              onChange={this.onUsernameChanged} />
            <TextInput
              inputType="password"
              label="Password"
              name="password"
              placeholder="Enter a value"
              value={this.state.password}
              size={30}
              onChange={this.onPasswordChanged} />
            <Button onClick={this.onSubmitPressed} text="Login" />
          </div>
        </section>
          
        <section className="section">
          <div className="container box">
          <table className="table">
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
            </tr>
            </thead>
            <tbody>
              <tr>
                <td>isAuthenticated</td>
                <td>{ JSON.stringify(this.props.isAuthenticated) }</td>
              </tr>
              <tr>
                <td>raw auth</td>
                <td><div className="textValue">{ this.props.token }</div></td>
              </tr>
              <tr>
                <td>Header Claims</td>
                <td><div className="textValue">{ JSON.stringify(this.props.headerClaims) }</div></td>
              </tr>
              <tr>
                <td>Payload Claims</td>
                <td><div className="textValue">{ JSON.stringify(this.props.payloadClaims) }</div></td>
              </tr>

            </tbody>
          </table>

          </div>
        </section>
      </div>
    </Unauthenticated>)
  }

  private onUsernameChanged (event: React.SyntheticEvent<HTMLInputElement>) {
    event.preventDefault()
    this.setState({ ...this.state, username: event.currentTarget.value })    
  }

  private onPasswordChanged (event: React.SyntheticEvent<HTMLInputElement>) {
    event.preventDefault()
    this.setState({ ...this.state, password: event.currentTarget.value })    
  }

  private onSubmitPressed (event: React.SyntheticEvent<HTMLButtonElement>) {
    event.preventDefault()
    this.props.login!({
      password: this.state.password,
      username: this.state.username
    });

  
  }
}  

export default container.connectContainer(LoginComponent)