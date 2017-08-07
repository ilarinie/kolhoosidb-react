import * as React from 'react';
import { Snackbar } from 'material-ui';
import { AppState } from '../../store/state';
import { inject, observer } from 'mobx-react';

@inject('appState')
@observer
export default class KolhoosiSnackBar extends React.Component<{appState: AppState}, {open: boolean, autohideDuration: number, message: string}> {
   
    constructor(props: any) {
        super(props);
        this.state = {
            open: this.props.appState.showSnackbar,
            message: this.props.appState.snackbarMessage,
            autohideDuration: 5000,
        };
    }

    render() {
      console.log('rndrdss');
      return (
            <Snackbar
              open={this.props.appState.showSnackbar}
              message={this.props.appState.snackbarMessage}
              autoHideDuration={4000}
              onRequestClose={this.handleRequestClose}
            />
        );
      }

    handleRequestClose = () => {
        this.setState({
          open: false,
        });
      }
}