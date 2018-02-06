import * as React from 'react';
import { shallow } from 'enzyme';
import { assert } from 'chai';
import PurchaseCreator from '../purchasecreator';
import { PurchaseCategory } from '../../../../store/models/purchase_category';

it('renders without crashing', () => {
    const cat = new PurchaseCategory();
    cat.name = 'moi';
    cat.id = 1;
    const wrapper = shallow(
        <PurchaseCreator
            categories={[cat]}
            submitPurchase={null}
            expandable={null}
            loading={false}
        />
    );
    assert.ok(wrapper);
});