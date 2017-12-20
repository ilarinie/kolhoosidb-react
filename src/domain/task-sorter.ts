import { Task } from '../store/models/task';
import * as moment from 'moment';

export const sortTasks = (tasks: Task[]): Task[] => {
    const sortedTasks = tasks.sort((a: Task, b: Task) => {
        if (!a.priority) {
            return 1;
        }
        if (!b.priority) {
            return -1;
        }
        if (a.completions.length === 0) {
            return -1;
        }
        if (b.completions.length === 0) {
            return 1;
        }
        return (moment(a.completions[a.completions.length - 1].created_at).add(a.priority, 'hours').valueOf())
            - (moment(b.completions[b.completions.length - 1].created_at).add(b.priority, 'hours').valueOf());
    });
    return sortedTasks;
};