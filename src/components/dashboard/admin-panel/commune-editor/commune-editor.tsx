import * as React from 'react';
import { MainState } from '../../../../store/state';
import { observer } from 'mobx-react';
import { Commune } from '../../../../store/models/commune';
import { PurchaseCategory } from '../../../../store/models/purchase_category';

import { PurchaseCategoryEditor } from './purchase-cat-editor';
import { CommuneDetailsEditor } from './commune-details-editor';
import { FullWidthCardWrapper } from '../../../util/full-width-card-wrapper';
import { FaPencil, FaCogs } from 'react-icons/lib/fa';

@observer
export class CommuneEditor extends React.Component<{ mainState: MainState }, {}> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                <FullWidthCardWrapper
                    title="Edit commune details"
                    icon={<FaCogs />}
                    hidden={false}
                    classIdentifier="edit-commune-form"
                >
                    <CommuneDetailsEditor
                        commune={this.props.mainState.communeState.selectedCommune}
                        submitCommuneChanges={this.handleSubmit}
                    />
                </FullWidthCardWrapper>
                <FullWidthCardWrapper
                    title="Edit purchase categories"
                    icon={<FaPencil />}
                    classIdentifier="edit-purchase-categories-form"
                >
                    <PurchaseCategoryEditor
                        createCategory={this.createCategory}
                        categories={this.props.mainState.communeState.selectedCommune.purchase_categories}
                    />
                </FullWidthCardWrapper>
            </div>
        );
    }

    createCategory = (purchaseCategory: PurchaseCategory) => {
        this.props.mainState.purchaseState.createPurchaseCategory(purchaseCategory);
    }

    handleSubmit = (commune: Commune) => {
        this.props.mainState.communeState.updateCommune(commune);
    }

}
