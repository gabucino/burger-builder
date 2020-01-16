import React, { Fragment, Component } from 'react';

import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
    componentWillUpdate() {
        console.log('[OrderSummary] - WillUpdate')
    }
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return <li key={igKey}><span style={{ textTransform: 'capitalize' }}>{igKey}:</span> {this.props.ingredients[igKey]}</li>
            })
        return (
            <Fragment>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total price: ${this.props.totalPrice.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button clicked={this.props.purchaseCancel} btnType="Danger">CANCEL</Button>
                <Button clicked={this.props.purchaseContinue} btnType="Success">CONTINUE</Button>
            </Fragment>
        )
    }

}

export default OrderSummary;