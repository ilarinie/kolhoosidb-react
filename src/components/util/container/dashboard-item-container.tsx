import * as React from 'react';
import { UiState } from '../../../store/ui-state';

interface DashboardItemContainerProps {
    padding?: string;
    title: string;
    uiState: UiState;
    maxHeight?: string;
    width?: string;
}

interface DashboardItemContainerState {
    open: boolean;
}

export class DashboardItemContainer extends React.Component<DashboardItemContainerProps, DashboardItemContainerState> {

    maxHeight = this.props.maxHeight ? this.props.maxHeight : '400px';
    width = this.props.width ? this.props.width : '500px';
    padding = this.props.padding ? this.props.padding : '20px';

    innerContainerStyles = {
        margin: '10px 10px',
        width: this.width,
        maxWidth: '95vw',
        border: '0.5px solid lightgray',
        borderColor: this.props.uiState.getKolhoosiTheme().palette.borderColor,
        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
    };

    innerContainerHeaderStyles = {
        textAlign: 'center',
        background: this.props.uiState.getKolhoosiTheme().palette.primary1Color,
        // background: '-webkit-linear-gradient(90deg, rgba(255,0,37,1) 0%, rgba(222,15,0,1) 100%)',
        paddingTop: '5px',
        color: 'white'
    };

    innerContainerContentStyles = {
        padding: this.padding,
        overflowY: 'auto' as 'auto',
        maxHeight: this.maxHeight,
        color: this.props.uiState.getKolhoosiTheme().palette.textColor,
        background: this.props.uiState.getKolhoosiTheme().palette.canvasColor
    };

    getInnerContainerStyles = () => {
        let styles = Object.assign({}, this.innerContainerStyles);
        return styles;
    }

    constructor(props: any) {
        super(props);
        this.state = {
            open: true
        };
    }

    changeWidth = (width: any) => {
        var styles: any = this.innerContainerStyles;
        styles.width = width;
        this.innerContainerStyles = styles;
    }

    getInnerContainerContentStyles = () => {
        if (this.state.open) {
            return this.innerContainerContentStyles;
        } else {
            return { display: 'none' };
        }
    }

    toggleOpen = () => {
        this.setState({ open: !this.state.open });
        return false;
    }
    render() {
        const mediaQuery = window.matchMedia('(min-width: 768px)');
        let innerContainerStyles;

        if (mediaQuery.matches) {
            innerContainerStyles = this.getInnerContainerStyles();
            innerContainerStyles.width = this.width;
        } else {
            innerContainerStyles = this.innerContainerStyles;
            innerContainerStyles.width = '95vw';
        }
        return (
            <div style={innerContainerStyles}>
                <div
                    id="otsikkorivi"
                    style={this.innerContainerHeaderStyles}
                >
                    {this.props.title}
                    <div style={{ float: 'right', marginRight: '10px' }}>
                        <span style={{ cursor: 'pointer' }} onClick={this.toggleOpen}>_</span>
                    </div>
                    <hr />
                </div>
                <div style={this.getInnerContainerContentStyles()}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}