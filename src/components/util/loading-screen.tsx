import * as React from 'react';
import { FaSpinner, FaStar } from 'react-icons/lib/fa';

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
                    <FaStar style={{ color: 'red' }} size={72} className="fa-spin" />
                </div>
            );
        } else {
            return (
                <div style={{ width: '100%' }}>
                    {this.props.children}
                </div>
            );
        }

    }
}