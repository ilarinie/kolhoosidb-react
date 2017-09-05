import { observable } from 'mobx';
import { TaskCompletion } from './task_completion';
import { persist } from 'mobx-persist';

export class Task {

    @persist @observable id: number;
    @persist @observable name: string;
    @persist @observable priority?: number;
    @persist @observable reward?: number;
    @persist @observable completions: TaskCompletion[];
    @persist @observable created_at: Date;
    @persist @observable updated_at: Date;

    constructor() {
        this.name = '';
        this.priority = 0;
        this.reward = 0;
    }

}