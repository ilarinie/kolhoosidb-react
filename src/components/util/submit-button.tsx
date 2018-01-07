import * as React from 'react';
import { RaisedButton } from 'material-ui';
import { FaStar } from 'react-icons/lib/fa';

export class SubmitButton extends React.Component<{ className?: string, label: string, loading: boolean, onClick?: any, type?: string }, {}> {

    render() {
        if (this.props.loading) {
            return (
                <RaisedButton className={this.props.className} type={this.props.type || ''} disabled={true} ><FaStar style={{ color: 'red' }} className="fa-spin" />
                    {this.props.children}
                </RaisedButton>
            );
        } else {
            return (
                <RaisedButton className={this.props.className} type={this.props.type || ''} label={this.props.label} onClick={this.props.onClick} >
                    {this.props.children}
                </RaisedButton>
            );
        }

    }

}