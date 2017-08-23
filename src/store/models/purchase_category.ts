import { observable } from 'mobx';
import { persist } from 'mobx-persist';
export class PurchaseCategory {
    @persist @observable id: number;
    @persist @observable name: string;
}