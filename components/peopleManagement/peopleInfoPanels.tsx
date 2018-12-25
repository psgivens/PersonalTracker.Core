import * as React from 'react';
import { PersonIdb } from 'src/core/data/PeopleModels';
import Button from 'src/jscommon/controls/Button';

type BasicProps = {} & {
    people: PersonIdb[]
    onEdit: (person:PersonIdb) => (event: React.SyntheticEvent<HTMLButtonElement>) => void
    onDelete: (person:PersonIdb) => (event: React.SyntheticEvent<HTMLButtonElement>) => void
}

const PeopleInfoPanels: React.SFC<BasicProps> = ({people, onEdit, onDelete}:BasicProps) => {  
  return (<>
    {people.map((person:PersonIdb) => {
    const actions = <> 
        <Button onClick={onEdit(person)} text="Edit" />
        <Button onClick={onDelete(person)} text="Delete" /> 
      </>

    return (
      <div 
        className="list-item"
        key={person.id}>
        {person.firstName}, 
        {person.lastName}, 
        <br />
        {actions}
    </div>)      
  })} </>)
}

export default PeopleInfoPanels;