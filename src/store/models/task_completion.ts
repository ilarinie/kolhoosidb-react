import { observable } from 'mobx';
import { persist } from 'mobx-persist';

export class TaskCompletion {
    @persist @observable name: string;
    @persist @observable created_at: Date;
}