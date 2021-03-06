import * as React from 'react';
import { Snackbar } from 'material-ui';

import { inject, observer } from 'mobx-react';
import { MainState } from '../../store/state';
import { decorate, style } from '../../theme';
import { compose } from 'recompose';
import { WithStyles } from 'material-ui/styles/withStyles';

class KolhoosiSnackBar extends React.Component<{ mainState: MainState } & WithStyles, { open: boolean, autohideDuration: number, message: string }> {

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
        message={<p>{this.props.mainState.uiState.snackbarMessage}</p>}
        autoHideDuration={4000}
      // onRequestClose={this.handleRequestClose}
      // onActionClick={this.props.mainState.uiState.undoFunction ? this.props.mainState.uiState.undoFunction : null}
      // action={this.props.mainState.uiState.undoFunction ? 'Undo' : null}
      />
    );
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  }
}

export default compose<{ mainState: MainState } & WithStyles, any>(
  decorate,
  style,
  observer,
)(KolhoosiSnackBar);