import { observable } from 'mobx';
import { persist } from 'mobx-persist';
import { Invitation } from './invitation';
import { Refund } from './refund';

export class User {
    @persist @observable id?: number;
    @persist @observable username: string;
    @persist @observable name: string;
    @persist @observable email: string;
    password?: string;
    password_confirmation?: string;
    @persist @observable created_at: Date;
    @persist @observable updated_at: Date;
    @persist('list') @observable invitations: Invitation[];
    @persist('list') @observable sent_refunds: Refund[];
    @persist('list') @observable received_refunds: Refund[];
}