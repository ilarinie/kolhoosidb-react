import { observable } from 'mobx';

export class User {
    @observable id?: number;
    @observable username: string;
    @observable name: string;
    password?: string;
    password_confirmation?: string;
    @observable created_at: Date;
    @observable updated_at: Date;
}