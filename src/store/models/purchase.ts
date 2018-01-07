import { observable } from 'mobx';
import { persist } from 'mobx-persist';
import { computed } from 'mobx/lib/api/computed';

export class Purchase {
    @persist @observable id: number;
    @persist @observable user_id: number;
    @persist @observable description: string;
    @persist @observable purchase_category_id: number;
    @persist @observable amount: number;
    @persist @observable name: string;
    @persist @observable category: string;
    @persist @observable created_at: Date;
    @persist @observable updated_at: Date;
    @computed humanDate = this.created_at.toDateString();
}