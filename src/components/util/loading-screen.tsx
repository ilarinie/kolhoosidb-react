import * as React from 'react';
import { FaSpinner, FaStar } from 'react-icons/lib/fa';
import { WithStyles } from 'material-ui/styles/withStyles';
import { compose } from 'recompose';
import { decorate, style } from '../../theme';

const loadingDivStyles = {
    margin: '0 auto',
    marginTop: '100px',
    width: '100%',
    height: '300px',
    textAlign: 'center'
};

class LoadingScreenImpl extends React.Component<{ loading: boolean } & WithStyles, {}> {
    render() {
        if (this.props.loading) {
            return (
                <div style={loadingDivStyles}>
                    <FaStar style={{ color: this.props.theme.palette.primary.dark }} size={72} className="fa-spin" />
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

export const LoadingScreen = compose<{ loading: boolean }, any>(
    decorate,
    style
)(LoadingScreenImpl);

export default LoadingScreen;