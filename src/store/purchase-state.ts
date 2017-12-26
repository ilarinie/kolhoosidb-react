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
            this.mainState.uiState.dataLoading = true;
            let budget = await ApiService.get(`communes/${this.selectedCommuneId()}/budget`);
            budget.users.sort((a, b) => { return b.total - a.total; });
            this.mainState.communeState.selectedCommune.budget = budget;
        } catch (error) {
            this.mainState.uiState.showDashboardError(error.message);
        } finally {
            this.mainState.uiState.dataLoading = false;
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
            await ApiService.post(`communes/${this.selectedCommuneId()}/purchases`, { purchase: purchase });
            this.mainState.uiState.showDashboardError('Purchase created.');
            this.getBudget();
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
            await ApiService.destroy(`communes/${this.selectedCommuneId()}/${purchase.id}`);
            this.mainState.uiState.showDashboardError('Purchase deleted.');
        } catch (error) {
            this.mainState.uiState.showDashboardError(error.message);
        }
    }

    @action
    async createRefund(refund: Refund) {
        try {
            await ApiService.post(`communes/${this.selectedCommuneId()}/refunds`, { refund: refund });
            this.mainState.uiState.showDashboardError('Refund created.');
            this.mainState.userState.getUser();
        } catch (error) {
            this.mainState.uiState.showDashboardError(error.message);
        }
    }

    @action
    async cancelRefund(refund: Refund) {
        try {
            await ApiService.destroy(`communes/${this.selectedCommuneId()}/refunds/${refund.id}/cancel`);
            this.mainState.uiState.showDashboardError('Refund cancelled');
            this.mainState.userState.getUser();
        } catch (error) {
            this.mainState.uiState.showDashboardError(error.message);
        }
    }

    @action
    async acceptRefund(refund: Refund) {
        try {
            await ApiService.post(`communes/${this.selectedCommuneId()}/refunds/${refund.id}/confirm`, {});
            this.mainState.uiState.showDashboardError('Refund accepted');
            this.mainState.userState.getUser();
            this.getBudget();
        } catch (error) {
            this.mainState.uiState.showDashboardError(error.message);
        }
    }

    @action
    async rejectRefund(refund: Refund) {
        try {
            await ApiService.post(`communes/${this.selectedCommuneId}/refunds/${refund.id}/reject`, {});
            this.mainState.uiState.showDashboardError('Refund rejected');
            this.mainState.userState.getUser();
        } catch (error) {
            this.mainState.uiState.showDashboardError(error.message);
        }
    }

}