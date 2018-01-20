import { UserStore } from './user-state';
import { UiState } from './ui-state';
import { AuthState } from './auth-state';
import { CommuneState } from './commune-state';
import { TaskState } from './task-state';
import { PurchaseState } from './purchase-state';
import { Commune } from './models/commune';

export class MainState {
  userState: UserStore;
  uiState: UiState;
  authState: AuthState;
  communeState: CommuneState;
  taskState: TaskState;
  purchaseState: PurchaseState;

  constructor() {
    this.userState = new UserStore(this);
    this.uiState = new UiState(this);
    this.authState = new AuthState(this);
    this.communeState = new CommuneState(this);
    this.taskState = new TaskState(this);
    this.purchaseState = new PurchaseState(this);
  }

  selCommune = (): Commune => {
    return this.communeState.selectedCommune;
  }

  reset = () => {
    this.userState = new UserStore(this);
    this.uiState = new UiState(this);
    this.authState = new AuthState(this);
    this.communeState = new CommuneState(this);
    this.taskState = new TaskState(this);
    this.purchaseState = new PurchaseState(this);
  }
}

export const mainState = new MainState();
