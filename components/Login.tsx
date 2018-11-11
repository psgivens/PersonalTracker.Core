
import * as React from 'react';
import * as container from 'src/jscommon/components/loginComponent/loginComponentContainer'
import Button from 'src/jscommon/controls/Button';
import TextInput from 'src/jscommon/controls/TextInput';

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
  return (<div className="container-fluid" >
    <section className="hero is-primary">
      <div className="hero-body">
        <p className="title">
          Documentation
        </p>
        <p className="subtitle">
          Everything you need to <strong>create a website</strong> with Bulma
        </p>
      </div>
    </section>    
    <section className="section">
      <div className="container">
      <TextInput
          inputType="text"
          label="Username"
          name="username"
          placeholder="Enter a value"
          value={this.state.username}
          onChange={this.onUsernameChanged} />
        <TextInput
          inputType="password"
          label="Password"
          name="password"
          placeholder="Enter a value"
          value={this.state.password}
          onChange={this.onPasswordChanged} />
        <Button onClick={this.onSubmitPressed} text="Login" />
      </div>
    </section>
       
    <section className="section">
      <div className="container">
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
            <td>{ this.props.token }</td>
          </tr>
          <tr>
            <td>Header Claims</td>
            <td>{ JSON.stringify(this.props.headerClaims) }</td>
          </tr>
          <tr>
            <td>Payload Claims</td>
            <td>{ JSON.stringify(this.props.payloadClaims) }</td>
          </tr>

        </tbody>
      </table>

      </div>
    </section>
  </div>)
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