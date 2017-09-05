import * as React from 'react';
import { UiState } from '../../store/ui-state';

export class ComponentThemeWrapper extends React.Component<{ uiState: UiState }, {}> {

    style = {
        width: 'count(100vw - 250px)',
        minHeight: '100vh',
        padding: '20px',
        background: this.props.uiState.getKolhoosiTheme().palette.canvasColor,
        color: this.props.uiState.getKolhoosiTheme().palette.textColor
    };

    constructor(props: any) {
        super(props);

    }
    render() {
        return (
            <div style={this.style}>
                {this.props.children}
            </div>
        );
    }
}