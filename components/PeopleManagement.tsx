
import * as React from 'react'
import Authenticated from 'src/app/components/Authenticated'
import * as container from 'src/jscommon/components/CrudlContainer'
import Button from 'src/jscommon/controls/Button'
import Hidden from 'src/jscommon/controls/Hidden'
import TextInput from 'src/jscommon/controls/TextInput'
import { PomodoroArc } from '../controls/PomodoroArc'
import { PomodoroControls } from '../controls/PomodoroControls'
import { emptyPerson, PersonIdb } from '../data/PeopleModels';
import PeopleInfoPanels from './peopleManagement/peopleInfoPanels';


type ThisProps = 
  container.StateProps<PersonIdb> 
  & container.ConnectedDispatch<PersonIdb>
  & container.AttributeProps

// TODO: Add error-boundaries
// https://reactjs.org/docs/error-boundaries.html

type ComponentState = {} & {
  person: PersonIdb,
  redirect: string | void
}

class PeopleManagementComp extends React.Component<ThisProps, ComponentState> {
  constructor (props:ThisProps) {
    super (props)
    this.state = {
      person: emptyPerson,
      redirect: undefined
    }

  this.onFirstNameChanged = this.onFirstNameChanged.bind(this)
  this.onLastNameChanged = this.onLastNameChanged.bind(this)

  this.onSubmitPressed = this.onSubmitPressed.bind(this)
  this.onClearPressed = this.onClearPressed.bind(this)

  this.onEdit = this.onEdit.bind(this)
  this.onDelete = this.onDelete.bind(this)

  this.props.loadItems!()
}

  public render () {
    const peopleInoPanels = (
     <PeopleInfoPanels 
        people={this.props.items}
        onDelete={this.onDelete}
        onEdit={this.onEdit}
      />)
    
  return (
    <Authenticated>
        <section className="blade listings is-primary">
          <div className="blade-title" >
            Pomodoros
          </div>
          <div className="blade-body pomodoros" >
            <div className="pomodoro-items">
              {peopleInoPanels}
            </div>
          </div>
        </section>
        <section className="blade details" >
          <div className="blade-body" >
            <div className="box" >
              <p>Id: {this.state.person.id}</p>
              <Hidden
                name="id"
                value={this.state.person.id} />
              <TextInput
                inputType="text"
                label="First Name"
                name="firstName"
                placeholder="Enter a value"
                size={50}
                value={this.state.person.firstName}
                onChange={this.onFirstNameChanged} />
              <TextInput
                inputType="text"
                label="Last Name"
                name="lastName"
                placeholder="Enter a value"
                size={50}
                value={this.state.person.lastName}
                onChange={this.onLastNameChanged} />

              <Button onClick={this.onSubmitPressed} text="Save" />
              <Button onClick={this.onClearPressed} text="Clear" />
            </div>
            <div className="box">
              <PomodoroControls name="first_pomodoro" />
              <PomodoroArc guageId="first_pomodoro" />
            </div>      
          </div>
        </section>
    </Authenticated>)
  }

  private onFirstNameChanged (event: React.SyntheticEvent<HTMLInputElement>) {
    event.preventDefault()
    this.setState({ ...this.state, person: {...this.state.person, firstName: event.currentTarget.value}})    
  }
  private onLastNameChanged (event: React.SyntheticEvent<HTMLInputElement>) {
    event.preventDefault()
    this.setState({ ...this.state, person: {...this.state.person, lastName: event.currentTarget.value}})    
  }
  private onSubmitPressed (event: React.SyntheticEvent<HTMLButtonElement>) {
    event.preventDefault()
    this.props.addItem!(
      { ...this.state.person }
    )
  }
  private onClearPressed (event: React.SyntheticEvent<HTMLButtonElement>) {
    event.preventDefault()
    this.setState({ ...this.state, person: emptyPerson })    
  }
  private onEdit (person:PersonIdb) { 
    return (event: React.SyntheticEvent<HTMLButtonElement>) => {
      event.preventDefault()
      this.setState({ ...this.state, person })    
    }
  }
  private onDelete (pomodoro:PersonIdb) {
    return (event: React.SyntheticEvent<HTMLButtonElement>) => {
      event.preventDefault()
      this.props.deleteItem!(pomodoro.id)
    }
  }
}

// Export the react component
export default container.connectContainer("People", PeopleManagementComp, s => s.people)

