import { MainState } from './state';
import { Task } from './models/task';
import * as ApiService from './api-service';
import { KolhoosiError } from './error';
import { action, observable } from 'mobx';
import { TaskCompletion } from './models/task_completion';

export class TaskState {
    mainState: MainState;

    @observable taskLoading: number = 0;

    constructor(mainState: MainState) {
        this.mainState = mainState;
    }

    getSelectedCommuneId = () => {
        if (this.mainState.communeState.selectedCommune) {
            return this.mainState.communeState.selectedCommune.id;
        }
        throw new KolhoosiError('Commune must be selected to do that', []);
    }

    @action
    async createTask(task: Task) {
        try {
            this.mainState.uiState.tasksLoading = true;
            const commune_id = this.getSelectedCommuneId();
            let newTask = await ApiService.post(`communes/${commune_id}/tasks`, { task: task });
            let sleeppy = await new Promise(resolve => setTimeout(resolve, 1000));
            this.mainState.uiState.tasksLoading = false;
            this.mainState.communeState.selectedCommune.tasks.push(newTask);
            this.mainState.uiState.showDashboardError('A new task was created.');
            return;
        } catch (error) {
            this.mainState.uiState.showDashboardError(error.message);
            this.mainState.uiState.tasksLoading = false;

        }
    }

    @action
    async updateTask(task: Task) {
        try {
            const commune_id = this.getSelectedCommuneId();
            let newTask = await ApiService.put(`communes/${commune_id}/tasks/${task.id}`, { task: task });
            this.mainState.communeState.selectedCommune.tasks[this.mainState.communeState.selectedCommune.tasks.findIndex(oldTask => oldTask.id === task.id)] = newTask;
            this.mainState.uiState.showDashboardError('Task updated.');
        } catch (error) {
            this.mainState.communeState.refreshCommune();
            this.mainState.uiState.showDashboardError(error.message);
        }
    }

    @action
    async deleteTask(task: Task) {
        try {
            const commune_id = this.getSelectedCommuneId();
            await ApiService.destroy(`communes/${commune_id}/tasks/${task.id}`);
            this.mainState.communeState.selectedCommune.tasks.splice(this.mainState.communeState.selectedCommune.tasks.findIndex(oldTask => oldTask.id === task.id), 1);
            // this.mainState.communeState.refreshCommune();
        } catch (error) {
            this.mainState.uiState.showDashboardError(error.message);
        } finally {
            this.mainState.uiState.dataLoading = false;
        }

    }

    @action
    async getTasks() {
        try {
            this.mainState.uiState.dataLoading = true;
            const commune_id = this.getSelectedCommuneId();
            this.mainState.communeState.selectedCommune.tasks = await ApiService.get(`communes/${commune_id}/tasks`);
        } catch (error) {
            this.mainState.uiState.showDashboardError(error.message);
        } finally {
            this.mainState.uiState.dataLoading = false;
        }

    }

    @action
    async completeTask(task: Task): Promise<any> {
        try {
            this.taskLoading = task.id;
            const commune_id = this.getSelectedCommuneId();
            let completion = await ApiService.post(`communes/${commune_id}/tasks/${task.id}/complete`, {});
            let sleeppy = await new Promise(resolve => setTimeout(resolve, 250));
            this.mainState.communeState.selectedCommune.tasks[this.findTaskIndex(task.id)].completions.unshift(completion);
            this.mainState.communeState.getTopList();
            this.mainState.communeState.getFeed();
            this.mainState.uiState.showDashboardError(task.name + ' completed!', this.undoLastCompletion.bind(this));
        } catch (error) {
            this.mainState.uiState.showDashboardError(error.message);
        } finally {
            this.taskLoading = 0;
        }
    }

    @action
    async deleteTaskCompletion(completion: TaskCompletion): Promise<any> {
        try {
            const commune_id = this.getSelectedCommuneId();
            await ApiService.destroy(`communes/${commune_id}/task_completions/${completion.id}`);
            this.deleteTaskCompletionFromTask(completion.task_id, completion.id);
        } catch (error) {
            this.mainState.uiState.showDashboardError(error.message);
        } finally {
            this.taskLoading = 0;
        }
    }

    @action
    async undoLastCompletion(): Promise<any> {
        try {
            const commune_id = this.getSelectedCommuneId();
            let response = await ApiService.destroy(`communes/${commune_id}/undo_last_completion`);
            this.deleteTaskCompletionFromTask(response.task_id, response.id);
            this.mainState.uiState.showDashboardError('Succesfully undone last completion.');
        } catch (error) {
            this.mainState.uiState.showDashboardError(error.message);
        }
    }
    findTaskIndex = (task_id: number): number => {
        return this.mainState.communeState.selectedCommune.tasks.findIndex(t => t.id === task_id);
    }

    @action
    deleteTaskCompletionFromTask(task_id: number, completion_id: number) {
        let completions = this.mainState.communeState.selectedCommune.tasks[this.findTaskIndex(task_id)].completions;
        let index = completions.findIndex(t => t.id === completion_id);
        if (index !== -1) {
            this.mainState.communeState.selectedCommune.tasks[this.findTaskIndex(task_id)].completions.splice(index, 1);
        }
    }

}