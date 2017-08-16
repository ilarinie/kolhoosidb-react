import { MainState } from './state';
import { observable, action } from 'mobx';
import { persist } from 'mobx-persist';
import * as ApiService from './api-service';
import { User } from './models/user';
import { Invitation } from './models/invitation';

export class UserStore {
  mainState: MainState;

  @persist('object') @observable current_user: User;
  @persist('list') @observable all_users: User[] = [];

  constructor(mainState: MainState) {
      this.mainState = mainState;
  }

  async createUser(user: User): Promise<any> {
    this.mainState.uiState.registerError.isError = false;
    this.mainState.uiState.registerLoading = true;
    try {
      await ApiService.post('users', { user: user });
      this.mainState.authState.logIn(user.username, user.password || '');
    } catch (error) {
      this.mainState.uiState.registerError = error;
      this.mainState.uiState.registerError.isError = true;
    } finally {
      this.mainState.uiState.registerLoading = false;
    }
  }

  @action
  async getUser(): Promise<any> {
    try {
      this.current_user = await ApiService.get('/users/' + this.current_user.id);
    } catch (error) {
      this.mainState.uiState.showDashboardError(error.message);
    }
  }

  @action
  async updateUser(user: User) {
    try {
      this.current_user = await ApiService.put('/users/' + this.current_user.id, user);
    } catch (error) {
      this.mainState.uiState.showDashboardError(error.message);
    }
  }
  @action
  async deleteUser() {
    try {
      await ApiService.destroy('/users/' + this.current_user.id);
      this.mainState.authState.logOut();
    } catch (error) {
      this.mainState.uiState.showDashboardError(error.message);
    }
  }

  // invite user to commune
  @action
  async inviteUser(username: string) {
    try {
      await ApiService.post(`communes/${this.mainState.communeState.selectedCommune.id}/invite/`, {username: username});
      this.mainState.communeState.refreshCommune();
      this.mainState.uiState.showDashboardError('Invitation sent.');
    } catch (error) {
      this.mainState.uiState.showDashboardError(error.message);
    }
  }

  @action
  async acceptInvitation(invitation: Invitation) {
    try {
      await ApiService.post(`invitations/${invitation.id}/accept`, {});
      this.mainState.uiState.showDashboardError('Invitation accepted!');
      this.mainState.userState.current_user.invitations.splice(this.mainState.userState.current_user.invitations.findIndex(inv => inv.id === invitation.id), 1);
    } catch (error) {
      this.mainState.uiState.showDashboardError('Accepting invitation failed, try again');
    }
  }

  @action
  async rejectInvitation(invitation: Invitation) {
    try {
      await ApiService.post(`invitations/${invitation.id}/reject`, {});
      this.mainState.uiState.showDashboardError('Invitation rejected!');
      this.mainState.userState.current_user.invitations.splice(this.mainState.userState.current_user.invitations.findIndex(inv => inv.id === invitation.id), 1);
    } catch (error) {
      this.mainState.uiState.showDashboardError('Accepting invitation failed, try again');
    }
  }
 
}
