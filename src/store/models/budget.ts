import { persist } from 'mobx-persist';
import { observable } from 'mobx';
export class Budget {
    @persist @observable commune_total: number;
    @persist @observable commune_avg: number;
    @persist @observable users: BudgetRow[];

}

export class BudgetRow {
    @persist @observable name: string;
    @persist @observable total: number;
}