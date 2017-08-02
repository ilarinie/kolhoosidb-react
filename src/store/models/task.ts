import { observable } from 'mobx';
import {TaskCompletion} from "./task_completion";

export class Task {
    @observable id: number;
    @observable name: string;
    @observable priority: number;
    @observable completions: TaskCompletion[];
    @observable created_at: Date;
    @observable updated_at: Date;
}