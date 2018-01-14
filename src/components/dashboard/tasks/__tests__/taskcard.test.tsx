import * as React from 'react';
import { TaskCard } from '../taskcard';
import { Task } from '../../../../store/models/task';
import { TaskCompletion } from '../../../../store/models/task_completion';
import { shallow } from 'enzyme';
import { assert } from 'chai';

it('renders without crashing', () => {
    // const task: Task = new Task();

    // task.name = 'Test Task';
    // task.created_at = new Date();
    // task.priority = 23;
    // const completion: TaskCompletion = new TaskCompletion();
    // completion.name = 'tester';
    // completion.created_at = new Date();
    // task.completions = [
    //     completion
    // ];
    // task.updated_at = new Date();

    // const completeTask = (gettask: Task) => {
    //     console.log(gettask);
    // };
    // const wrapper = shallow(<TaskCard completeTask={completeTask} task={task} current_user_id={1} deleteTaskCompletion={completeTask} />);
    // assert.ok(wrapper);
});