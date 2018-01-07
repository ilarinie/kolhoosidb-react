import { observable } from 'mobx';
import { persist } from 'mobx-persist';

export class TaskCompletion {
    @persist @observable name: string;
    @persist @observable created_at: Date;
    @persist @observable id: number;
    @persist @observable user_id: number;
    @persist @observable task_id: number;
}