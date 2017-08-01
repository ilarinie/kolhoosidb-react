import {observable} from 'mobx';

export class Todo {
    @observable title: string;
    @observable finished: boolean = false;
}