import { MainState } from './state';
import { persist } from 'mobx-persist';
import { observable, action } from 'mobx';
import { Commune } from './models/commune';
import createBrowserHistory from '../history';
import * as ApiService from './api-service';

export class CommuneState {
    mainState: MainState;

    @persist @observable communeSelected: boolean = false;
    @persist('object') @observable selectedCommune: Commune;
    @persist('list') @observable communes: Commune[] = [];

    constructor(mainState: MainState) {
        this.mainState = mainState;
    }
    
    @action
    async selectCommune(commune: Commune)  {
        try {
          this.selectedCommune = await ApiService.get('communes/' + commune.id);
          this.communeSelected = true;
          createBrowserHistory.push('/');
        } catch (error) {
          this.mainState.uiState.showDashboardError(error.message);
        }  
    }

    @action
    async refreshCommune() {
      try {
        this.selectedCommune = await ApiService.get(`communes/${this.selectedCommune.id}`);
      } catch (error) {
        this.mainState.uiState.showDashboardError('Refreshing commune data failed, sorry :(');
      }
    }

    @action
    async createCommune(commune: Commune) {
      let payload = {commune: commune};
      try {
        let newCommune = await ApiService.post('communes', payload) as Commune;
        this.communes.push(newCommune);
      } catch (error) {
        this.mainState.uiState.showDashboardError(error.message);
      }
    }

    @action
    async deleteCommune(id: number)  {
      try {
        await ApiService.destroy('communes/' + id);
        this.communes.splice(this.communes.findIndex(commune => commune.id === id), 1);
      } catch (error) {
        this.mainState.uiState.showDashboardError(error.message);
      }
    }

    @action
    async getCommunes() {
      try {
        this.communes = await ApiService.get('/communes');
      } catch (error) {
        this.mainState.uiState.showDashboardError(error.message);
      }
    }
}