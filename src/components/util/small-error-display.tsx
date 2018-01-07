import * as React from 'react';
import { KolhoosiError } from '../../store/error';

const divStyles = {
    width: '300px',
    padding: '5px',
    color: 'red',
    margin: '0 auto'
};

const ulStyles = {
    padding: '0',
    margin: '0',
    listStyleType: 'none'
};

export class SmallErrorDisplay extends React.Component<{error: KolhoosiError}, {}> {
    render() {
        if (!this.props.error.isError) {
            return null;
        }

        let errors = this.props.error.errors.map((error, index) => (
            <li key={index}><h5>{error}</h5></li>
        ));
        let message = null;
        if (this.props.error.message && this.props.error.message.length !== 0) {
            message = this.props.error.message;
            if (errors.length !== 0) {
                message = message + ':';
            }
        }
        return (
            <div style={divStyles}>
                <h4>{message}</h4>
                <ul style={ulStyles}>
                    {errors}
                </ul>
            </div>
        );
    }

}