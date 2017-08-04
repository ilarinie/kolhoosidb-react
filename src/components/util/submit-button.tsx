import * as React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export class SubmitButton extends React.Component<{ label: string, loading: boolean, onTouchTap?: any, type?: string }, {}>{

    render() {
        if (this.props.loading) {
            return (
                <RaisedButton label="Loading.." disabled={true} />
            );
        } else {
            return (
                <RaisedButton label={this.props.label} onTouchTap={this.props.onTouchTap} type={this.props.type}/>
           );
        }

    }

}