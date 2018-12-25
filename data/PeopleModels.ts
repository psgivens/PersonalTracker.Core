import { CrudlEntity } from 'src/jscommon/data/CrudlDomainCommands';

export type PersonIdb = CrudlEntity & {
    version: number
    firstName: string
    lastName: string
}

export const emptyPerson: PersonIdb = {
    firstName: "",
    id: 0,
    lastName: "",
    version: 0
  }
  

export type GroupIdb = CrudlEntity & {
    version: number
    groupName: string
    members: PersonIdb []
}

