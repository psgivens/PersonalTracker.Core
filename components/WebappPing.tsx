import * as React from 'react'
import { Route } from 'react-router-dom';
import Authenticated from 'src/app/components/Authenticated';
import PingComponent from 'src/jscommon/components/PingComponent';

type ThisProps = {} & {}

const WebappPingComponent:React.SFC<ThisProps> = (props:ThisProps) => {

  return (
    <Authenticated>
        <Route component={PingComponent} />
    </Authenticated>)
}

// Export the react component
export default WebappPingComponent