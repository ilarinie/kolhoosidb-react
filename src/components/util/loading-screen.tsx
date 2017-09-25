import * as React from 'react';
import { FaSpinner } from 'react-icons/lib/fa';

const loadingDivStyles = {
    margin: '0 auto',
    marginTop: '100px',
    width: '100%',
    height: '300px',
    textAlign: 'center'
};

export class LoadingScreen extends React.Component<{ loading: boolean }, {}> {
    render() {
        if (this.props.loading) {
            return (
                <div style={loadingDivStyles}>
                    <FaSpinner size={72} className="fa-spin" />
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