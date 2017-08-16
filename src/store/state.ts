import { UserStore } from './user-state';
import { UiState } from './ui-state';
import { AuthState } from './auth-state';
import { CommuneState } from './commune-state';
import { TaskState } from './task-state';

export class MainState {
  userState: UserStore;
  uiState: UiState;
  authState: AuthState;
  communeState: CommuneState;
  taskState: TaskState;

  constructor() { 
    this.userState = new UserStore(this);
    this.uiState = new UiState(this);
    this.authState = new AuthState(this);
    this.communeState = new CommuneState(this);
    this.taskState = new TaskState(this);
  }

  reset = () => {
    this.userState = new UserStore(this);
    this.uiState = new UiState(this);
    this.authState = new AuthState(this);
    this.communeState = new CommuneState(this);
    this.taskState = new TaskState(this);
  }
}

export const mainState = new MainState();
