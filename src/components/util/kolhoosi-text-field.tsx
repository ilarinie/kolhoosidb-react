import * as React from 'react';
import TextField from 'material-ui/TextField';

export class KolhoosiTextField extends React.Component<{type: string, id: string, hintText?: string, name?: string}, {}> {
    divStyles = {
        border: '1px solid grey',
        borderRadius: '5px',
        paddingLeft: '10px',
        paddingRight: '10px',
        width: '90%'
    };
    inputStyles = {
        width: '100%'
    };

    render() {
        return (
                <TextField type={this.props.type} id={this.props.id} hintText={this.props.hintText} name={this.props.name} />
        );
    }
}