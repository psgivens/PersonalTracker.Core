import { ValuesEvent } from '../actions/ValuesSaga';

export function valuesReducers(state:string [] = [], action: ValuesEvent): string[] {
  switch(action.type) {
    case "VALUES_SUCCESS_STRINGS":
      return action.values
    case "VALUES_FAILED":
      return []
    default:
      return state
  }
}



