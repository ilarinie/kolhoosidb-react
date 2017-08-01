import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './App.css';
import { Provider } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import { LoginComponent } from "./components/login";
import {Route, Router, Redirect, Switch} from 'react-router-dom';
import { Dashboard } from "./components/dashboard";
import { Communelist } from "./components/communelist";
import createBrowserHistory from './history';
import { AppState } from "./store/state";
import { TasksComponent } from "./components/tasks";

const logo = require('./logo.svg');

class App extends React.Component<{}, {}> {
  render(): any {
    return (
      <div>
        <Provider appState={appState}>
          <Router history={createBrowserHistory}>
            <Switch>
              <Route path='/login' component={LoginComponent} />
              <CommunelistRoute path='/communelist' component={Communelist} />
              <DashboardRoute path='/' component={Dashboard} />
            </Switch>
          </Router>
        </Provider>
      </div>
    );
  }
}

const DashboardRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    appState.selectedCommune ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/communelist',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const CommunelistRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    appState.loggedIn ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const appState = new AppState();

export default App;
