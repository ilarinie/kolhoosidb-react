import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { MainState } from '../../../store/state';
import { Refund } from '../../../store/models/refund';
import DashboardTasksComponent from '../dashboard-component/dashboard-tasks';
import DashboardPurchasesComponent from '../dashboard-component/dashboard_purchases';
import PurchaseCreator from '../purchases/purchasecreator';
import { Purchase } from '../../../store/models/purchase';
import { AnimatedSwitch } from 'react-router-transition';
import { compose } from 'recompose';
import { decorate, style } from '../../../theme';
import { WithStyles, BottomNavigation, BottomNavigationAction } from 'material-ui';
import { FaTasks, FaMoney, FaEur } from 'react-icons/lib/fa';
import { ThemeWrapper } from '../../util/theme-wrapper';

interface MobileDashboardComponentProps {
    mainState: MainState;
}

interface MobileDashboardComponentState {
    shownComponent: number;
}

class MobileDashboardComponent extends React.Component<MobileDashboardComponentProps & WithStyles, MobileDashboardComponentState> {
    outerContainerStyles: any = {
        maxWidth: '95%',
        width: '100vw',
        height: '100%',
        overflow: 'auto',
        margin: '0 auto',
        // background: this.props.theme.palette.background.default,
    };

    headerStyle = {
        margin: '0 auto',
        textAlign: 'center',
        fontWeight: 'bold' as 'bold',
        fontVariant: 'small-caps'

    };

    footerStyles: any = {
        position: 'fixed',
        boxShadow: '15px 15px 100',
        bottom: 0,
        left: 0,
        width: '100vw',
        height: '2em',
        background: this.props.theme.palette.primary.main,
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        borderTop: '1px solid ' + this.props.theme.palette.primary.main,
    };

    constructor(props: any) {
        super(props);
        this.state = {
            shownComponent: 0
        };
    }

    componentDidMount() {
        this.props.mainState.uiState.getDashboardContents(false);
    }

    getFeed = () => {
        this.props.mainState.communeState.getFeed();
    }
    getTopList = () => {
        this.props.mainState.communeState.getTopList();
    }

    acceptRefund = (refund: Refund) => {
        this.props.mainState.purchaseState.acceptRefund(refund);
    }
    cancelRefund = (refund: Refund) => {
        this.props.mainState.purchaseState.cancelRefund(refund);
    }
    rejectRefund = (refund: Refund) => {
        this.props.mainState.purchaseState.rejectRefund(refund);
    }

    submitPurchase = (purchase: Purchase) => {
        this.props.mainState.purchaseState.createPurchase(purchase);
    }

    getComponent = () => {
        switch (this.state.shownComponent) {
            case 0:
                return (
                    <div style={{ width: '100%', overflow: 'auto' }}>
                        <div style={this.headerStyle}>Tasks</div>
                        <DashboardTasksComponent mainState={this.props.mainState} />
                    </div>
                );
            case 1:
                return (
                    <div style={{ width: '100%', overflow: 'hidden' }}>
                        <div style={this.headerStyle}>Create a purchase</div>
                        <PurchaseCreator
                            categories={this.props.mainState.selCommune().purchase_categories}
                            submitPurchase={this.submitPurchase}
                            expandable={false}
                            loading={this.props.mainState.uiState.purchaseLoading}
                        />
                    </div>
                );
            case 2:
                return (
                    <div style={{ width: '100%', overflow: 'auto' }}>
                        <div style={this.headerStyle}>Budget</div>
                        <DashboardPurchasesComponent mainState={this.props.mainState} hideButtons={true} />
                    </div>
                );
            default:
                return null;
        }
    }

    switchTab = (id: number) => {
        this.setState({ shownComponent: id });
    }

    handleChange = (event, value) => {
        this.setState({ shownComponent: value });
    }

    render() {
        const value = this.state.shownComponent;
        return (
            <ThemeWrapper>
                <div style={this.outerContainerStyles}>
                    <AnimatedSwitch
                        key={this.state.shownComponent}
                        atEnter={{ opacity: 0 }}
                        atLeave={{ opacity: 0 }}
                        atActive={{ opacity: 1 }}
                        className="switch-wrapper"
                        runOnMount={true}
                    >
                        {this.getComponent()}
                    </AnimatedSwitch>
                </div>
                <BottomNavigation
                    style={{
                        position: 'fixed',
                        bottom: 0,
                        width: '100vw',
                        maxWidth: '100%'
                    }}
                    value={value}
                    onChange={this.handleChange}
                    showLabels={true}
                    classes={this.props.classes}
                >
                    <BottomNavigationAction label="Tasks" icon={<FaTasks />} />
                    <BottomNavigationAction label="New Purchase" icon={<FaMoney />} />
                    <BottomNavigationAction label="Budget" icon={<FaEur />} />
                </BottomNavigation>
            </ThemeWrapper>
        );
    }
}

const FooterLink = props => {
    let linkStyles = {
        margin: '0 auto',
        color: props.selected ? '#333' : 'white',
        height: '100%',
        background: props.selected ? 'white' : 'inherit',
        paddingTop: '0.3em',
        width: '33%',
        textAlign: 'center',
        borderRadius: '5px 5px 0px 0px'
    };

    const clicker = () => {
        props.onClick(props.id);
    };
    return (
        <span style={linkStyles} onClick={clicker}>{props.children}</span>
    );
};

export default compose<MobileDashboardComponentProps & WithStyles, any>(
    decorate,
    style,
    inject('mainState'),
    observer,
)(MobileDashboardComponent);