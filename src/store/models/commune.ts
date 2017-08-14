import { observable } from 'mobx';
import { User } from './user';
import { Task } from './task';
import { Purchase } from './purchase';
import { persist } from 'mobx-persist';

export class Commune {
    @persist @observable id: number;
    @persist @observable name: string;
    @persist @observable description?: string;
    @persist @observable tasks?: Task[];
    @persist @observable users?: User[];
    @persist @observable purchases?: Purchase[];
    @persist @observable created_at?: Date;
    @persist @observable updated_at?: Date;
    @persist @observable current_user_admin: boolean;
}