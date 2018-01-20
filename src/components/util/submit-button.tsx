import * as React from 'react';
import { RaisedButton } from 'material-ui';
import { FaStar, FaCheck } from 'react-icons/lib/fa';

interface SubmitButtonProps {
    className?: string;
    label: string;
    loading: boolean;
    onClick?: any;
    type?: string;
    fullWidth?: boolean;
    backgroundColor?: string;
    labelStyle?: object;
    completed?: boolean;
}

interface SubmitButtonState {
    lastState: boolean;
}

export class SubmitButton extends React.Component<SubmitButtonProps, SubmitButtonState> {

    timeout: any;
    lastState: boolean = false;

    constructor(props: any) {
        super(props);
        this.state = {
            lastState: false
        };
    }

    disabled = () => {
        return this.props.loading || this.lastState;
    }

    render() {
        let buttonIcon = this.getButtonIcon();
        return (
            <RaisedButton
                className={this.props.className}
                type={this.props.type || ''}
                label={this.disabled() ? null : this.props.label}
                onClick={this.props.onClick}
                disabled={this.disabled()}
                fullWidth={this.props.fullWidth ? true : false}
                backgroundColor={this.props.backgroundColor ? this.props.backgroundColor : null}
                labelStyle={this.props.labelStyle ? this.props.labelStyle : null}
            >
                {buttonIcon}
                {this.props.children}
            </RaisedButton>
        );
    }

    getButtonIcon = () => {
        if (this.lastState) {
            this.setTimeout();
            return (<FaCheck style={{ color: 'green' }} />);
        } else {
            if (this.props.loading) {
                this.lastState = true;
                return (<FaStar style={{ color: 'red' }} className="fa-spin" />);
            } else {
                return null;
            }
        }
    }

    setTimeout = () => {
        this.timeout = setTimeout(
            () => {
                this.lastState = false;
                this.setState({ lastState: false });
            },
            5000);
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }
}