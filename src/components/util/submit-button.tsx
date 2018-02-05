import * as React from 'react';
import { Button } from 'material-ui';
import { FaStar, FaCheck } from 'react-icons/lib/fa';
import { compose } from 'recompose';
import { decorate } from '../../theme';
import { WithStyles } from 'material-ui/styles/withStyles';
/**
 * Props for submit button
 */
interface SubmitButtonProps {
    /**
     * Class names
     */
    className?: string;
    /**
     * Text on the button
     */
    label: string;
    /**
     * Show loading state 
     */
    loading: boolean;
    /**
     * onClick callback
     */
    onClick?: any;
    /**
     * type prop on <button> element
     */
    type?: string;
    /**
     * set to true to make button width 100%
     */
    fullWidth?: boolean;
    /**
     * background color
     */
    backgroundColor?: string;
    /**
     * Show completed state
     */
    completed?: boolean;
}

interface SubmitButtonState {
    lastState: boolean;
}

/**
 * Universal button with loading and completed states
 */
export class SubmitButton extends React.Component<SubmitButtonProps & WithStyles, SubmitButtonState> {

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
            <Button
                raised={true}
                className={this.props.className}
                type={this.props.type || ''}
                onClick={this.props.onClick}
                disabled={this.disabled()}
                fullWidth={this.props.fullWidth ? true : false}
            >
                {this.disabled() ? null : this.props.label}
                {buttonIcon}
                {this.props.children}
            </Button>
        );
    }

    getButtonIcon = () => {
        if (this.lastState) {
            this.setTimeout();
            return (<FaCheck style={{ color: 'green' }} />);
        } else {
            if (this.props.loading) {
                this.lastState = true;
                return (<FaStar style={{ color: this.props.theme.palette.primary.dark }} className="fa-spin" />);
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
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = 0;
        }
    }
}

export default compose<SubmitButtonProps, any>(
    decorate,
)(SubmitButton);