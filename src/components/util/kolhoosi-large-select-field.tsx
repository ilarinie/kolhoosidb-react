import { SelectValidator } from 'react-material-ui-form-validator';
import * as React from 'react';
import { NavigationExpandMore } from 'material-ui/svg-icons';

interface KolhoosiLargeSelectFieldProps {
    value: any;
    label: string;
    onChange: any;
    children: any;
    className?: string;
}

export const KolhoosiLargeSelectField = (props: KolhoosiLargeSelectFieldProps) => {
    const selectStyle = {
        width: '95%',
    };
    return (
        <div style={{ textAlign: 'left' }}>
            <p>{props.label}</p>
            <div style={{ border: '1px solid lightgray', borderRadius: '5px', textAlign: 'center', fontWeight: 'bold' }}>
                <SelectValidator
                    className={props.className || null}
                    name="category_id"
                    style={selectStyle}
                    value={props.value}
                    onChange={props.onChange}
                    validators={['required']}
                    underlineShow={false}
                    dropDownMenuProps={{
                        iconButton: <NavigationExpandMore />
                    }}
                    iconStyle={{
                        fill: 'grey',
                    }}
                    labelStyle={{
                        textAlign: 'center',
                        color: 'gray',
                        marginRight: '-50px',
                        fontFamily: 'inconsolata',
                        fontSize: '25px',
                        marginBottom: '-20px'
                    }}
                >
                    {props.children}
                </SelectValidator>
            </div>
        </div>
    );
};