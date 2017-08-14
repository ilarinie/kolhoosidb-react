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
    selectCommune = (id: number) => {
      if (this.communes[id] !== null) {
        this.selectedCommune = this.communes[id];
        this.communeSelected = true;
        createBrowserHistory.push('/');
      }
    }
  
    @action
    createCommune = (commune: Commune) => {
      let payload = { commune: commune };
      ApiService.post('communes', payload).then((response) => {
        this.communes.push(response as Commune);
        this.selectCommune(this.communes.length - 1);
      }).catch((error) => {
        this.mainState.uiState.showDashboardError(error.message);
      });
    }
  
    @action
    deleteCommune = (id: number) => {
      ApiService.destroy('communes/' + id).then((response) => {
        this.communes.splice(this.communes.findIndex(commune => commune.id === id), 1);
      }).catch((error) => {
        this.mainState.uiState.showDashboardError(error.message);
      });
    }
  
    @action
    getCommunes = (): Promise<any> => {
      this.mainState.uiState.dataLoading = true;
      return ApiService.get('communes').then((response) => {
        this.communes = response as Commune[];
      }).catch((error) => {
        this.mainState.uiState.showDashboardError(error.message);
      }).then(() => {
        this.mainState.uiState.dataLoading = false;
      });
    }

}