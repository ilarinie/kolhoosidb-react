import * as React from 'react';
import { shallow } from 'enzyme';
import { assert } from 'chai';
import PurchasesComponent from '../purchases';
import { MainState } from '../../../../store/state';

it('renders without crashing', () => {
    const mainState = new MainState();
    const wrapper = shallow(
        <PurchasesComponent mainState={mainState} />
    );
    assert.ok(wrapper);
});