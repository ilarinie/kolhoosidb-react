import * as React from 'react';
import { Snackbar } from 'material-ui';
import { inject, observer } from 'mobx-react';
import { MainState } from '../../store/state';

@inject('mainState')
@observer
export default class KolhoosiSnackBar extends React.Component<{mainState: MainState}, {open: boolean, autohideDuration: number, message: string}> {
   
    constructor(props: any) {
        super(props);
        this.state = {
            open: this.props.mainState.uiState.showSnackbar,
            message: this.props.mainState.uiState.snackbarMessage,
            autohideDuration: 5000,
        };
    }

    render() {
      return (
            <Snackbar
              open={this.props.mainState.uiState.showSnackbar}
              message={this.props.mainState.uiState.snackbarMessage}
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