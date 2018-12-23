
import { PeopleEvent } from '../actions/PeopleSaga';
import { GroupIdb, PersonIdb } from '../data/PeopleModels';

export function peopleReducers(state:PersonIdb [] = [], action: PeopleEvent): PersonIdb[] {
  switch(action.type) {
    case "PEOPLE_SUCCESS_PEOPLE":
      return action.people
    case "PEOPLE_FAILED":
      return []
    default:
      return state
  }
}

export function groupsReducers(state:GroupIdb [] = [], action: PeopleEvent): GroupIdb[] {
  switch(action.type) {
    case "PEOPLE_SUCCESS_GROUPS":
      return action.groups
    case "PEOPLE_FAILED":
      return []
    default:
      return state
  }
}


