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

  isCurrentOwner = (): boolean => {
    return this.selectedCommune.is_owner;
  }

  @action
  async getFeed() {
    try {
      this.selectedCommune.feed = await ApiService.get('communes/' + this.selectedCommune.id + '/activity_feed');
    } catch (error) {
      this.mainState.uiState.showDashboardError(error.message);
    }
  }  

  @action
  async selectCommune(id: number) {
      try {
        this.selectedCommune = await ApiService.get('communes/' + id);
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
    let payload = { commune: commune };
    try {
      let newCommune = await ApiService.post('communes', payload) as Commune;
      this.communes.push(newCommune);
    } catch (error) {
      this.mainState.uiState.showDashboardError(error.message);
    }
  }
  @action
  async updateCommune(commune: Commune) {
    let payload = { commune: commune };
    try {
      this.selectedCommune = await ApiService.put('communes/' + this.selectedCommune.id, payload);
      this.mainState.uiState.showDashboardError('Commune updated.');
    } catch (error) {
      this.mainState.uiState.showDashboardError(error.message);
    }
  }

  @action
  async deleteCommune(id: number) {
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
      this.mainState.uiState.dataLoading = true;
      this.communes = await ApiService.get('/communes');
    } catch (error) {
      this.mainState.uiState.showDashboardError(error.message);
    } finally {
      this.mainState.uiState.dataLoading = false;
    }
  }
}