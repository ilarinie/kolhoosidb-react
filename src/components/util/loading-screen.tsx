import * as React from 'react';
import FontIcon from 'material-ui/FontIcon';

const loadingDivStyles = {
    margin: '0 auto',
    marginTop: '100px',
    width: '100%',
    height: '300px',
    textAlign: 'center'
};

export class LoadingScreen extends React.Component<{ loading: boolean }, {}>{
    render() {
        if (this.props.loading) {
            return (
                <div style={loadingDivStyles}>
                    <i className="fa fa-spinner fa-spin fa-5x"> </i>  
                </div>
            );
        } else {
            return (
                <div>
                    {this.props.children}
                </div>
            );
        }

    }
}