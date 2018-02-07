import * as React from 'react';
import { compose } from 'recompose';
import { decorate, style } from '../../../theme';
import { observer } from 'mobx-react';
import { WithStyles } from 'material-ui/styles/withStyles';
import { TextField } from 'material-ui';
import * as moment from 'moment';
import Select from 'material-ui/Select/Select';
import { TextValidator } from 'react-material-ui-form-validator';

interface TaskPrioritySelectorProps {
    value: number;
    onChange: any;
}

interface TaskPrioritySelectorState {
    humanizedValue: string;
}

class TaskPrioritySelectorImpl extends React.Component<TaskPrioritySelectorProps & WithStyles, TaskPrioritySelectorState> {

    constructor(props: any) {
        super(props);
        this.state = {
            humanizedValue: moment.duration(this.props.value, 'hours').humanize()
        };
    }

    handleChange = (event) => {
        this.setState({
            humanizedValue: moment.duration(parseInt(event.target.value, 10), 'hours').humanize(false)
        });
        this.props.onChange(event.target.value);
    }

    render() {
        return (
            <div >
                <p>Task priority</p>
                <p>If the task needs to be completed in certain intervals, you can set the time between completions here (in hours)</p>
                <TextValidator
                    name="priority"
                    type="number"
                    helperText="hours"
                    value={this.props.value}
                    validators={['required']}
                    onChange={this.handleChange}
                    style={{ float: 'left', marginRight: '1em' }}
                />
                <p>Should be completed every {this.state.humanizedValue}</p>
            </div>
        );
    }
}

export const TaskPrioritySelector = compose<TaskPrioritySelectorProps, any>(
    decorate,
    style,
    observer
)(TaskPrioritySelectorImpl);

export default TaskPrioritySelector;