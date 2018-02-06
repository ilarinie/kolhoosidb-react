import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { UiState } from './store/ui-state';
import { MuiThemeProvider } from 'material-ui';
import { compose } from 'recompose';

class ThemeObserver extends React.Component<{ uiState: UiState }, {}> {
    constructor(props: any) {
        super(props);

    }
    render() {
        return (
            <MuiThemeProvider
                theme={this.props.uiState.getKolhoosiTheme()}
            >
                {this.props.children}
            </MuiThemeProvider>
        );
    }
}

export default compose<{ uiState: UiState }, any>(
    observer,
)(ThemeObserver);