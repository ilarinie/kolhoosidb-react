import * as React from 'react';
import { TextValidator } from 'react-material-ui-form-validator';
import { FaEur } from 'react-icons/lib/fa';
import { WithStyles } from 'material-ui/styles/withStyles';
import { compose } from 'recompose';
import { decorate, style } from '../../theme';

interface KolhoosiLargeTextInputProps {
    value: any;
    name: string;
    type: string;
    onChange: any;
    label: string;
    currency: boolean;
    validators: string[];
    textareaStyle?: object;
    multiline?: boolean;
    rows?: number;
    align: string;
}

export const KolhoosiLargeTextInput = (props: KolhoosiLargeTextInputProps) => {
    const textFieldStyle = {
        width: props.multiline ? '95%' : '85%',
    };

    return (
        <div style={{ margin: '0 auto' }} >
            <p style={{ fontSize: '12px' }}>{props.label}</p>
            <div style={{ border: '1px solid lightgray', borderRadius: '5px', padding: '0px 0.1em', textAlign: props.align, fontSize: '14px', fontWeight: 'bold' }}>
                <TextValidator
                    style={textFieldStyle}
                    name={props.name}
                    type={props.type}
                    onChange={props.onChange}
                    value={props.value}
                    validators={props.validators}
                    InputProps={{
                        disableUnderline: true,
                    }}
                    rows={props.rows}
                    multiline={props.multiline}
                    step={props.currency ? '.01' : null}

                />
                {props.currency ? <FaEur style={{ fontSize: '20px', color: 'gray' }} /> : null}
            </div>
        </div>
    );
};

// export const KolhoosiLargeTextInput = compose<KolhoosiLargeTextInputProps, any>(
//     decorate,
//     style
// )(KolhoosiLargeTextInputImpl);