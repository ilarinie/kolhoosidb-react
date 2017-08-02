import {observable} from 'mobx';
import {User} from "./user";

export class Purchase {
    @observable user: User;
    @observable amount: number;
    @observable created_at: number;
    @observable updated_at: number;
}