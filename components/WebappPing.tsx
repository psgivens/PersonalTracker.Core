import * as React from 'react'
import { Route } from 'react-router-dom';
import Authenticated from 'src/app/components/Authenticated';
import PingComponent from 'src/jscommon/components/PingComponent';

type ThisProps = {} & {}

const WebappPingComponent:React.SFC<ThisProps> = (props:ThisProps) => {

  return (
    <Authenticated>
      <section className="blade full" >
        <div className="blade-body" >
          <Route component={PingComponent} />
        </div>
      </section>
    </Authenticated>)
}

// Export the react component
export default WebappPingComponent