import { CrudlPost } from 'src/jscommon/workers/CrudlDatabaseTableWorker';
import { CrudlDatabaseCommand, CrudlDatabaseEvent } from '../data/CrudlDomains';
import { PersonIdb } from '../data/PeopleModels';

export type PomodorosApi = {} & {
    getPeople: () => Promise<void | Response>
    crudlPost: CrudlPost
  }

export type GetPeopleResult = {} & {
  people: PersonIdb[]
}

const getPeople = (): Promise<Response> => {
    const url = "/api/values"
    return fetch(url, {        
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached        
        credentials: "same-origin", // include, same-origin, *omit
        headers: {
            // "Authorization": 'Bearer ' + token,
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        // body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(response => response.json()) // parses response to JSON
    .catch(error => {
      // console.error("Error fetching " + url)
      // console.error(`Fetch Error =\n`, error)      
    });
};


const GET = (url: string): Promise<CrudlDatabaseEvent> => {
  return fetch(url, {        
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached        
    credentials: "same-origin", // include, same-origin, *omit
    headers: {
        // "Authorization": 'Bearer ' + token,
        "Content-Type": "application/json; charset=utf-8",
        // "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
    // body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
  .then(response => 
    response
      .json()
      .then((items:PersonIdb[]) => ({
          items,
          type: "CRUDL_DATA_LOADED"
        } as CrudlDatabaseEvent))
      // .catch((error) => ({
      //   items:[],
      //   type: "CRUDL_DATA_LOADED"
      // } as CrudlDatabaseEvent))
    )
  .catch(error => {
    // console.error("Error fetching " + url)
    // console.error(`Fetch Error =\n`, error)      
    return {
      items:[],
      type: "CRUDL_DATA_LOADED"
    } as CrudlDatabaseEvent
  });  
}

const POST = (url: string, data:any): Promise<CrudlDatabaseEvent> => {
  return fetch(url, {        
    body: JSON.stringify(data), // body data type must match "Content-Type" header
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached        
    credentials: "same-origin", // include, same-origin, *omit
    headers: {
        // "Authorization": 'Bearer ' + token,
        "Content-Type": "application/json; charset=utf-8",
        // "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
  })
  .then(response => response.json()) // parses response to JSON
  .catch(error => {
    // console.error("Error fetching " + url)
    // console.error(`Fetch Error =\n`, error)      
  });  
}

const DELETE = (url: string): Promise<CrudlDatabaseEvent> => {
  return fetch(url, {        
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached        
    credentials: "same-origin", // include, same-origin, *omit
    headers: {
        // "Authorization": 'Bearer ' + token,
        "Content-Type": "application/json; charset=utf-8",
        // "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
    // body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
  .then(response => response.json()) // parses response to JSON
  .catch(error => {
    // console.error("Error fetching " + url)
    // console.error(`Fetch Error =\n`, error)      
  });  
}


const crudlPost = (command: CrudlDatabaseCommand): Promise<CrudlDatabaseEvent> => {
  switch(command.type) {
    case "CRUDL_LOAD_DATA": 
      return GET('/api/people')
    case "CRUDL_LOAD_BATCH":
      throw new Error("command type not implemented: " + command.type)
    case "CRUDL_INSERT_ITEM":
      return POST('/api/people', {})
    case "CRUDL_DELETE_ITEM":
      return DELETE('/api/people')
    default:
      throw new Error("command type not implemented: " + command.type)
  }  
}

export const pomodorosApi: PomodorosApi = {
  crudlPost,
  getPeople,
}



