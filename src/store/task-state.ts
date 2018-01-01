import { MainState } from './state';
import { Task } from './models/task';
import * as ApiService from './api-service';
import { KolhoosiError } from './error';
import { action, observable } from 'mobx';

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
            const commune_id = this.getSelectedCommuneId();
            let newTask = await ApiService.post(`communes/${commune_id}/tasks`, { task: task });
            this.mainState.communeState.selectedCommune.tasks.push(newTask);
        } catch (error) {
            this.mainState.uiState.showDashboardError(error.message);
        }
    }

    @action
    async updateTask(task: Task) {
        try {
            const commune_id = this.getSelectedCommuneId();
            let newTask = await ApiService.put(`communes/${commune_id}/tasks/${task.id}`, { task: task });
            this.mainState.communeState.selectedCommune.tasks[this.mainState.communeState.selectedCommune.tasks.findIndex(oldTask => oldTask.id === task.id)] = newTask;
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
            this.mainState.communeState.selectedCommune.tasks[this.findTaskIndex(task)].completions.push(completion);
            this.mainState.communeState.getTopList();
            this.mainState.communeState.getFeed();
        } catch (error) {
            this.mainState.uiState.showDashboardError(error.message);
        } finally {
            this.taskLoading = 0;
        }
    }

    findTaskIndex = (task: Task) => {
        return this.mainState.communeState.selectedCommune.tasks.findIndex(t => t.id === task.id);
    }

}