import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './App.css';
import { Provider } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import { LoginComponent } from './components/login';
import { Route, Router, Redirect, Switch } from 'react-router-dom';
import { Dashboard } from './components/dashboard/dashboard';
import createBrowserHistory from './history';
import { AppState } from './store/state';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { kolhoosiTheme } from './theme';

class App extends React.Component<{}, {}> {
  render(): any {
    return (
      <div>
        <MuiThemeProvider 
          muiTheme={kolhoosiTheme}
        >
          <Provider appState={appState}>
            <Router history={createBrowserHistory}>
              <Switch>
                <Route path="/login" component={LoginComponent} />
                <DashboardRoute path="/" component={Dashboard} />
              </Switch>
            </Router>
          </Provider>
        </MuiThemeProvider>
      </div>
    );
  }
}

/* tslint:disable */
const DashboardRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    appState.loggedIn ?
     ( <Component {...props} /> ) :
     ( <Redirect to={{pathname: '/login', state: { from: props.location } }}/>)
    )}
  />
);

export const CommuneSelectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    appState.communeSelected ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/communelist',
        state: { from: props.location }
      }}/>
    )
  )}/>
);


/* tslint:enable */

let appState: AppState = new AppState();
// if (localStorage.getItem('appState') !== null) {
//     appState = JSON.parse(localStorage.getItem('appstate') as string) as AppState;
// } else {
//     appState = new AppState();
// }

// setInterval(() => {
//   localStorage.setItem('apptate', JSON.stringify(appState));
// },          5000);

export default App;
