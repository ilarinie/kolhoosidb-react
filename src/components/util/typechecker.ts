import { Purchase } from '../../store/models/purchase';
import { TaskCompletion } from '../../store/models/task_completion';
export function isPurchase(object: Purchase | TaskCompletion): object is Purchase {
    return false;
}