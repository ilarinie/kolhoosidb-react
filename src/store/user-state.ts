import { MainState } from './state';
import { observable, action } from 'mobx';
import { persist } from 'mobx-persist';
import * as ApiService from './api-service';
// import { mainState } from './state';
import { User } from './models/user';

export class UserStore {
    mainState: MainState;

    @persist('object') @observable current_user: User;
    @persist('list') @observable all_users: User[] = [];

    constructor(mainState: MainState){
        this.mainState = mainState;
    }

      // USER RELATED METHODS¨
  @action
  getUser = (): Promise<any> => {
    return ApiService.get('/users/' + this.current_user.id).then((response) => {
      this.current_user = response.json() as User;
    });
  }

  @action
  getUsers = () => {
    this.mainState.uiState.dataLoading = true;
    ApiService.get('users').then((response) => {
      this.all_users = response as User[];
    }).catch((error) => {
      console.log(error);
    }) 
    .then(() => {
      this.mainState.uiState.dataLoading = false;
    });  
  }

  @action
  updateUser = (user: User) => {
    ApiService.put('/users/' + this.current_user.id, user).then((response) => {
      this.current_user = response.json() as User;
    });
  }
  @action
  deleteUser = () => {
    ApiService.destroy('/users/' + this.current_user.id).then((response) => {
      this.mainState.authState.logOut();
    });
  }
  @action
  createUser = (user: User) => {
    this.mainState.uiState.registerError.isError = false;
    this.mainState.uiState.registerLoading = true;
    let payload =  {user: user};
    ApiService.post('users/', payload).then((response) => {
      this.mainState.authState.logIn(user.username, user.password as string);
      this.mainState.uiState.registerLoading = false;
    }).catch((error: any) => {
      this.mainState.uiState.registerError = error;
      this.mainState.uiState.registerError.isError = true;
      this.mainState.uiState.registerLoading = false;
    });
  }

    // invite user to commune
    @action
    inviteUser = (username: string) => {
      ApiService.post('invitation', {username: username, commune_id: this.mainState.communeState.selectedCommune.id}).then((response) => {
        this.mainState.uiState.showDashboardError('Invitation sent.');
      }).catch((error) => {
        this.mainState.uiState.showDashboardError(error.message);
      });
    }
 
}
