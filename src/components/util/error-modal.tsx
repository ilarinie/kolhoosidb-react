import * as React from 'react';
import { Dialog } from 'material-ui';
import { UiState } from '../../store/ui-state';

interface ErrorModalProps {
    uiState: UiState;
}

interface ErrorModalState {

}

export class ErrorModal extends React.Component<ErrorModalProps, ErrorModalState> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div>jotain</div>
        );
    }
}