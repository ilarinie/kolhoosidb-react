import { persist } from 'mobx-persist';
import { observable } from 'mobx';
import { list, createModelSchema, primitive, object, serializable } from 'serializr';

export class BudgetRow {
    @serializable @observable name: string;
    @serializable @observable total: number;
}

createModelSchema(BudgetRow, {
    name: primitive(),
    total: primitive(),
});