import { observable } from 'mobx';
import { User } from './user';
import { persist } from 'mobx-persist';

export class Purchase {
    @persist @observable user: User;
    @persist @observable amount: number;
    @persist @observable created_at: number;
    @persist @observable updated_at: number;
}