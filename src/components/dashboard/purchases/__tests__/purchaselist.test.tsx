import * as React from 'react';
import { shallow } from 'enzyme';
import { assert } from 'chai';
import { PurchaseList } from '../purchaselist';
import { Purchase } from '../../../../store/models/purchase';

it('renders without crashing', () => {
    const purchases: Purchase[] = [];
    const deletePurchase = null;

    const wrapper = shallow(
        <PurchaseList
            totalPurchases={200}
            averagePurchase={300}
            purchases={purchases}
            current_user_id={1}
            deletePurchase={null}
        />
    );
    assert.ok(wrapper);
});