import { 
    // select, 
    takeEvery } from 'redux-saga/effects'
    import { 
        call,
        put } from 'redux-saga/effects'
        // import * as reducers from 'src/core/reducers'
import { pomodorosApi } from '../apis/pomodorosApi';
import { GroupIdb, PersonIdb } from '../data/PeopleModels';


export type PeopleCommand = {
    type: "PEOPLE_GET_PEOPLE"
} | {
    type: "PEOPLE_GET_GROUPS"
} 

export const PeopleCommands = {
    getGroups: ():PeopleCommand => ({ type: "PEOPLE_GET_GROUPS" }),
    getPeople: ():PeopleCommand => ({ type: "PEOPLE_GET_PEOPLE" }),
} 

export type PeopleEvent = {
    type: "PEOPLE_FAILED"
} | {
    type: "PEOPLE_SUCCESS_PEOPLE"
    people: PersonIdb[]
} | {
    type: "PEOPLE_SUCCESS_GROUPS"
    groups: GroupIdb[]
}

/************************ SAGA *********************/


export class PeopleSaga {
    constructor () {
        this.saga = this.saga.bind(this)
        this.getPeople = this.getPeople.bind(this)
    }

    /*************** Register listeners ********************/
    public *saga(): Iterator<any> {
        yield takeEvery('PEOPLE_GET_PEOPLE', (command:PeopleCommand) => this.getPeople(command))        
        yield takeEvery('PEOPLE_GET_GROUPS', (command:PeopleCommand) => this.getGroups(command))        
    }

    public *getPeople(action: PeopleCommand){

        // const getAuthnToken = (state:reducers.All): string => state.auth ? state.auth.token : ""
        // const token:string = yield select(getAuthnToken)
        const people = yield call(pomodorosApi.getPeople)

        // tslint:disable-next-line:no-console
        console.log(people)

        yield put( { 
            people,
            type: "PEOPLE_SUCCESS_PEOPLE",
        } as PeopleEvent)
    }


    public *getGroups(action: PeopleCommand){

        // const getAuthnToken = (state:reducers.All): string => state.auth ? state.auth.token : ""
        // const token:string = yield select(getAuthnToken)
        // const values = yield call(valuesApi.getValues, token)

        // // tslint:disable-next-line:no-console
        // console.log(values)

        yield put( { 
            groups: [],
            type: "PEOPLE_SUCCESS_GROUPS",
        } as PeopleEvent)
    }

}
