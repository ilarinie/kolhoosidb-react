import { SelectValidator } from 'react-material-ui-form-validator';
import * as React from 'react';
import { FaLevelDown } from 'react-icons/lib/fa';
import { decorate, style } from '../../theme';
import { compose } from 'recompose';
import { WithStyles } from 'material-ui/styles/withStyles';

interface KolhoosiLargeSelectFieldProps {
    value: any;
    label: string;
    onChange: any;
    children: any;
    className?: string;
}

const KolhoosiLargeSelectFieldImpl = (props: KolhoosiLargeSelectFieldProps & WithStyles) => {
    const selectStyle = {
        width: '95%',
    };
    return (
        <div style={{ textAlign: 'left' }}>
            <p style={{ fontSize: '12px' }}>{props.label}</p>
            <div style={{ border: '1px solid lightgray', borderRadius: '5px', textAlign: 'center', fontWeight: 'bold' }}>
                <SelectValidator
                    className={props.className || null}
                    name="category_id"
                    style={selectStyle}
                    value={props.value}
                    onChange={props.onChange}
                    validators={['required']}
                    SelectProps={{
                        MenuProps: {
                            className: props.classes.menu,
                        },
                        disableUnderline: true,
                    }}
                >
                    {props.children}
                </SelectValidator>
            </div>
        </div>
    );
};

export const KolhoosiLargeSelectField = compose<KolhoosiLargeSelectFieldProps, any>(
    decorate,
    style
)(KolhoosiLargeSelectFieldImpl);