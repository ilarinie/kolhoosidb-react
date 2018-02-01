import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { MainState } from '../../../store/state';
import { Refund } from '../../../store/models/refund';
import mail from 'material-ui/svg-icons/content/mail';
import { DashboardTasksComponent } from '../dashboard-component/dashboard-tasks';
import { DashboardPurchasesComponent } from '../dashboard-component/dashboard_purchases';
import { PurchaseCreator } from '../purchases/purchasecreator';
import { Purchase } from '../../../store/models/purchase';
import { AnimatedSwitch } from 'react-router-transition';

interface MobileDashboardComponentProps {
    mainState: MainState;
}

interface MobileDashboardComponentState {
    shownComponent: number;
}

@inject('mainState')
@observer
export class MobileDashboardComponent extends React.Component<MobileDashboardComponentProps, MobileDashboardComponentState> {
    outerContainerStyles: any = {
        width: '97vw',
        height: '60vh',
        padding: '5px',
    };

    headerStyle = {
        margin: '0 auto',
        textAlign: 'center'
    };

    footerStyles: any = {
        position: 'fixed',
        boxShadow: '15px 15px 100',
        bottom: 0,
        left: 0,
        width: '100vw',
        height: '2em',
        background: this.props.mainState.uiState.getKolhoosiTheme().palette.primary1Color,
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        borderTop: '1px solid ' + this.props.mainState.uiState.getKolhoosiTheme().palette.primary1Color,
    };

    constructor(props: any) {
        super(props);
        this.state = {
            shownComponent: 1
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
            case 1:
                return (
                    <div style={{ width: '95vw', maxWidth: '95vw', marginLeft: '5px', overflow: 'auto' }}>
                        <div style={this.headerStyle}>Tasks</div>
                        <DashboardTasksComponent mainState={this.props.mainState} />
                    </div>
                );
            case 2:
                return (
                    <div style={{ width: '95vw', maxWidth: '95vw', marginRight: '-2px', margin: '0 auto', overflow: 'hidden' }}>
                        <div style={this.headerStyle}>Create a purchase</div>
                        <PurchaseCreator
                            categories={this.props.mainState.selCommune().purchase_categories}
                            submitPurchase={this.submitPurchase}
                            expandable={false}
                            loading={this.props.mainState.uiState.purchaseLoading}
                        />
                    </div>
                );
            case 3:
                return (
                    <div style={{ width: '95vw', maxWidth: '95vw', marginRight: '-2px', margin: '0 auto', overflow: 'auto' }}>
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

    render() {
        return (
            <div style={{ height: '60vh' }}>
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
                <div style={this.footerStyles}>
                    <FooterLink id={1} selected={this.state.shownComponent === 1} onClick={this.switchTab}>Tasks</FooterLink>
                    <FooterLink id={2} selected={this.state.shownComponent === 2} onClick={this.switchTab}>New Purchase</FooterLink>
                    <FooterLink id={3} selected={this.state.shownComponent === 3} onClick={this.switchTab}>Budget</FooterLink>
                </div>
            </div>
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