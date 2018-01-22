import { MainState } from './state';
import { action } from 'mobx';
import * as ApiService from './api-service';
import { Purchase } from './models/purchase';
import { PurchaseCategory } from './models/purchase_category';
import { Refund } from './models/refund';

export class PurchaseState {

    mainState: MainState;

    constructor(mainState: MainState) {
        this.mainState = mainState;
    }

    selectedCommuneId = () => {
        return this.mainState.communeState.selectedCommune.id;
    }

    @action
    async getBudget() {
        try {
            let budget = await ApiService.get(`communes/${this.selectedCommuneId()}/budget`);
            budget.users.sort((a, b) => { return b.total - a.total; });
            budget.users.map((user, index) => {
                user.diff = (user.total - budget.commune_avg);
            });
            this.mainState.communeState.selectedCommune.budget = budget;
        } catch (error) {
            this.mainState.uiState.showDashboardError(error.message);
        }
    }

    @action
    async getPurchases() {
        try {
            this.mainState.communeState.selectedCommune.purchases = await ApiService.get(`communes/${this.selectedCommuneId()}/purchases`);
        } catch (error) {
            this.mainState.uiState.showDashboardError(error.message);
        }
    }

    @action
    async createPurchase(purchase: Purchase) {
        try {
            this.mainState.uiState.purchaseLoading = true;
            await ApiService.post(`communes/${this.selectedCommuneId()}/purchases`, { purchase: purchase });
            this.mainState.uiState.showDashboardError('Purchase created.');
            this.mainState.uiState.purchaseLoading = false;
            let sleeppy = await new Promise(resolve => setTimeout(resolve, 1000));
            this.mainState.uiState.purchaseDialogOpen = false;
            this.getBudget();
            this.getPurchases();
        } catch (error) {
            this.mainState.uiState.showDashboardError(error.message);
        }
    }

    @action
    async createPurchaseCategory(purchaseCategory: PurchaseCategory) {
        try {
            await ApiService.post(`communes/${this.selectedCommuneId()}/purchase_categories`, { purchase_category: purchaseCategory });
            this.mainState.uiState.showDashboardError('New category added.');
        } catch (error) {
            this.mainState.uiState.showDashboardError(error.message);
        }
    }

    @action
    async deletePurchase(purchase: Purchase) {
        try {
            await ApiService.destroy(`communes/${this.selectedCommuneId()}/purchases/${purchase.id}`);
            this.removePurchase(purchase);
            this.mainState.uiState.showDashboardError('Purchase deleted.');
        } catch (error) {
            this.mainState.uiState.showDashboardError(error.message);
        }
    }

    @action
    removePurchase(purchase: Purchase) {
        let index = this.mainState.communeState.selectedCommune.purchases.indexOf(purchase);
        if (index !== -1) {
            this.mainState.communeState.selectedCommune.purchases.splice(index, 1);
        }
    }

    @action
    async createRefund(refund: Refund) {
        try {
            this.mainState.uiState.purchaseLoading = true;
            await ApiService.post(`communes/${this.selectedCommuneId()}/refunds`, { refund: refund });
            this.mainState.uiState.showDashboardError('Refund created.');
            this.mainState.uiState.purchaseLoading = false;
            let sleeppy = await new Promise(resolve => setTimeout(resolve, 1000));
            this.mainState.uiState.refundDialogOpen = false;
            this.getRefunds();
        } catch (error) {
            this.mainState.uiState.showDashboardError(error.message);
        }
    }

    @action
    async getRefunds() {
        try {
            const commune = await ApiService.get(`communes/${this.selectedCommuneId()}`);
            this.mainState.selCommune().sent_refunds = commune.sent_refunds;
            this.mainState.selCommune().received_refunds = commune.received_refunds;
        } catch (error) {
            this.mainState.uiState.showDashboardError(error);
        }
    }

    @action
    async cancelRefund(refund: Refund) {
        try {
            await ApiService.destroy(`communes/${this.selectedCommuneId()}/refunds/${refund.id}/cancel`);
            this.mainState.uiState.showDashboardError('Refund cancelled.');
            this.getRefunds();
        } catch (error) {
            this.mainState.uiState.showDashboardError(error.message);
        }
    }

    @action
    async acceptRefund(refund: Refund) {
        try {
            await ApiService.post(`communes/${this.selectedCommuneId()}/refunds/${refund.id}/confirm`, {});
            this.mainState.uiState.showDashboardError('Refund accepted.');
            this.getRefunds();
            this.getBudget();
            this.getPurchases();
        } catch (error) {
            this.mainState.uiState.showDashboardError(error.message);
        }
    }

    @action
    async rejectRefund(refund: Refund) {
        try {
            await ApiService.post(`communes/${this.selectedCommuneId()}/refunds/${refund.id}/reject`, {});
            this.mainState.uiState.showDashboardError('Refund rejected.');
            this.getRefunds();
        } catch (error) {
            this.mainState.uiState.showDashboardError(error.message);
        }
    }

}