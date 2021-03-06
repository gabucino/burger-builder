import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button'

import classes from './CheckoutSummary.module.css'

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We know you'll love it</h1>
            <div style={{ width: '100%', height: 'auto', margin: 'auto' }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button
                btnType="Danger"
                clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button
                btnType="Success"
                clicked={props.checkoutContinued}>CONTINUE</Button>
        </div>
    );
}

export default checkoutSummary;