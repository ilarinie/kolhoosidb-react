import * as React from 'react';
import { compose } from 'recompose';
import { decorate, style } from '../../theme';
import { inject, observer } from 'mobx-react';

const ThemeWrapperImpl = (props: any) => {
    return (
        <div
            style={{
                background: props.theme.palette.background.default,
                width: '100%',
                height: 'calc(100vh - 64px)',
                minHeight: '100%',
                overflowY: 'auto',
                overflowX: 'hidden',
                color: props.theme.palette.text.primary
            }}
        >
            {props.children}
        </div>
    );
};

export const ThemeWrapper = compose<any, any>(
    decorate,
    style,
    inject('mainState'),
    observer,
)(ThemeWrapperImpl);