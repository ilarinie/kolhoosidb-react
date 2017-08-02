import { observer, inject } from 'mobx-react';
import * as React from 'react';
import { AppState } from '../../store/state';

@inject('appState')
@observer 
export class ProfileComponent extends React.Component<{appState: AppState}, {}> {
    render() {
        return (
            <div>
                <input />
            </div>
        );
    }
}