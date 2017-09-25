import * as React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { FaStar } from 'react-icons/lib/fa';

export class SubmitButton extends React.Component<{ label: string, loading: boolean, onTouchTap?: any, type?: string }, {}> {

    render() {
        if (this.props.loading) {
            return (
                <RaisedButton type={this.props.type || ''} disabled={true} ><FaStar style={{ color: 'red' }} className="fa-spin" /></RaisedButton>
            );
        } else {
            return (
                <RaisedButton type={this.props.type || ''} label={this.props.label} onTouchTap={this.props.onTouchTap} />
            );
        }

    }

}