import { observable } from 'mobx';
import { User } from './user';
import { Task } from './task';
import { Purchase } from './purchase';

export class Commune {
    @observable id: number;
    @observable name: string;
    @observable description?: string;
    @observable tasks?: Task[];
    @observable users?: User[];
    @observable purchases?: Purchase[];
    @observable created_at?: Date;
    @observable updated_at?: Date;
}