import { observer, inject } from 'mobx-react';
import * as React from 'react';
import { MainState } from '../../store/state';

@inject('mainState')
@observer 
export class ProfileComponent extends React.Component<{mainState: MainState}, {}> {
    render() {
        return (
            <div>
                <input />
            </div>
        );
    }
}