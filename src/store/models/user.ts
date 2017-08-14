import { observable } from 'mobx';
import { persist } from 'mobx-persist';

export class User {
    @persist @observable id?: number;
    @persist @observable username: string;
    @persist @observable name: string;
    password?: string;
    password_confirmation?: string;
    @persist @observable created_at: Date;
    @persist @observable updated_at: Date;
}