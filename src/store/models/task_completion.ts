import {observable} from 'mobx';
import {User} from "./user";
import {Task} from "./task";

export class TaskCompletion {
    @observable user: User;
    @observable task: Task;
    @observable created_at: Date;
}