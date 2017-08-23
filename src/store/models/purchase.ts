import { observable } from 'mobx';
import { persist } from 'mobx-persist';

export class Purchase {
    @persist @observable id: number;
    @persist @observable user_id: number;
    @persist @observable description: string;
    @persist @observable purchase_category_id: number;
    @persist @observable amount: number;
    @persist @observable created_at: number;
    @persist @observable updated_at: number;
}