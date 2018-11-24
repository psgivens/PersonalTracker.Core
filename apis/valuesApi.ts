
export type ValuesApi = {} & {
    getValues: (token:string) => Promise<void | Response>
  }

export type GetValuesResult = {} & {
  values: string[]
}

// function CallService(token) {
//   $.ajax({
//       type: 'GET',
//       url: '/api/values',
//       crossDomain: true,
//       timeout: 2000,
//       beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'Bearer ' + token) }
//   })
//   .done(function (data) {
//       console.log(data);

//       const valuesDiv = document.createElement("div")
//       $(valuesDiv).html(data)
//       $("#messages").append(valuesDiv)
//   });
// }


const getValues = (token:string): Promise<Response> => {
    const url = "/api/values"
    return fetch(url, {        
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached        
        credentials: "same-origin", // include, same-origin, *omit
        headers: {
            "Authorization": 'Bearer ' + token,
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


// const testConnection = (): Promise<void | Response> => {
//   const url = "http://localhost:5000/api/values"
//   return fetch(url, {        
//       cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached        
//       credentials: "same-origin", // include, same-origin, *omit
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Content-Type": "application/json; charset=utf-8",
//           // "Content-Type": "application/x-www-form-urlencoded",
//       },
//       method: "GET", // *GET, POST, PUT, DELETE, etc.
//       mode: "cors", // no-cors, cors, *same-origin
//       redirect: "follow", // manual, *follow, error
//       referrer: "no-referrer", // no-referrer, *client
//       // body: JSON.stringify(data), // body data type must match "Content-Type" header
//   })
//   .then(response => {
//     // tslint:disable-next-line:no-console
//     console.log("Status: " + response.type)
//    return response ? response.json() : "no response"
//   }) // parses response to JSON
//   .catch(error => {
//     // tslint:disable-next-line:no-console
//     console.error("Error fetching " + url)
//     // tslint:disable-next-line:no-console
//     console.error(`Fetch Error =\n`, error)      
//   });
// };



export const valuesApi: ValuesApi = {
  getValues
}



