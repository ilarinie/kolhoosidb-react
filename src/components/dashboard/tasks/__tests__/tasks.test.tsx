import * as React from 'react';
import TaskCard from '../taskcard';
import { Task } from '../../../../store/models/task';
import { TaskCompletion } from '../../../../store/models/task_completion';
import { shallow } from 'enzyme';
import { assert } from 'chai';
import TasksComponent from '../tasks';
import { MainState } from '../../../../store/state';

it('renders without crashing', () => {
    const task: Task = new Task();

    const wrapper = shallow(<TasksComponent mainState={new MainState()} />);
    assert.ok(wrapper);
});