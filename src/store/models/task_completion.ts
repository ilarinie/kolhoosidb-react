import { observable } from 'mobx';
import { User } from './user';
import { Task } from './task';
import { persist } from 'mobx-persist';

export class TaskCompletion {
    @persist @observable user: User;
    @persist @observable task: Task;
    @persist @observable created_at: Date;
}