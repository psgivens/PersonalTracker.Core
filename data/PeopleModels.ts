
export type PersonIdb = {} & {
    id: number
    version: number
    firstName: string
    lastName: string
}

export type GroupIdb = {} & {
    id: number
    version: number
    groupName: string
    members: PersonIdb []
}

