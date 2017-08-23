import { MainState } from './state';
import { action } from 'mobx';
import * as ApiService from './api-service';
import { Purchase } from './models/purchase';
import { PurchaseCategory } from './models/purchase_category';

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
            this.mainState.communeState.selectedCommune.budget = await ApiService.get(`communes/${this.selectedCommuneId()}/budget`);
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
            await ApiService.post(`communes/${this.selectedCommuneId()}/purchases`, {purchase: purchase});
            this.mainState.uiState.showDashboardError('Purchase created.');
            this.getBudget();
        } catch (error) {
            this.mainState.uiState.showDashboardError(error.message);
        }
    }

    @action
    async createPurchaseCategory(purchaseCategory: PurchaseCategory) {
        try {
            await ApiService.post(`communes/${this.selectedCommuneId()}/purchase_categories`, {purchase_category: purchaseCategory});
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

}