
import * as React from 'react';
import Unauthenticated from 'src/app/components/Unauthenticated';


type BasicProps = {} & {}

const Welcome: React.SFC<BasicProps> = ( ) => 
  (<Unauthenticated>
    <div className="container-fluid" >
      <section className="hero is-primary">
        <div className="hero-body">
          <p className="title">
            Simple Web Application
          </p>
          <p className="subtitle">
            This is a <strong>simple web application</strong> demonstrating some 
            abilities available through modern web-tech.           
          </p>
        </div>
      </section>    
      <section className="section">
        <div className="container">
          <p className="content">
              Technologies demonstrated in this project
              <ul>
                <li>React</li>
                <li>Redux</li>
                <li>Sagas</li>
                <li>Indexeddb</li>
                <li>Bulma/CSS</li>
                <li>OIDC</li>
                <li>D3</li>
              </ul>
          </p>
        </div>
      </section>
    </div>
  </Unauthenticated>)

export default Welcome