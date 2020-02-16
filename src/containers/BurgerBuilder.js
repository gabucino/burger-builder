import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'

import Burger from '../components/Burger/Burger';
import BuildControls from '../components/Burger/BuildControls/BuildControls';
import Modal from '../components/UI/Modal/Modal';
import OrderSummary from '../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../components/UI/Spinner/Spinner';
import axios from '../axios-orders'


//You could omit index, it would find it automatically
import * as actions from '../store/actions/index'

import withErrorHandler from './../hoc/withErrorHandler/withErrorHandler'


//export is for testing
export class BurgerBuilder extends Component {
    state = {
        purchasing: false,

    }

    componentDidMount() {
        this.props.onInitIngredients()
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(igkey => {
            return ingredients[igkey]
        }).reduce((sum, el) => {
            return sum + el
        }, 0)
        return sum > 0
    }


    purchaseHandler = () => {
        let notZero = false;
        Object.keys(this.props.ings).forEach(igKey => {
            if (this.props.ings[igKey] !== 0) {
                notZero = true;
            }
        })
        if (!this.props.isAuthenticated && notZero) {
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
        else if (this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        } else if (!this.props.isAuthenticated && !notZero) {
            this.props.history.push('/auth')
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {

        //Passing down queryparams:

        // const queryParams = []
        // for (let i in this.state.ingredients) {
        //     //encodeURIComponent transforms it to uri format. search syntax: ['salad=1' , 'bacon=2']
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        // }

        // queryParams.push('price=' + this.state.totalPrice)
        // const queryString = queryParams.join('&')


        if (this.props.isAuthenticated) {
            this.props.onInitPurchase()
            this.props.history.push('/checkout')
        }
    }


    render() {
        const disabledInfo = {
            ...this.props.ings
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        /*ingredients = {
            cheese = true
        }*/

        let orderSummary = null

        let burger = this.props.error ? <p>Ingredients cant be loaded</p> : <Spinner />
        //Without this check the initial data would fail, if there are no ingredients
        if (this.props.ings) {
            burger = (
                <Fragment>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        price={this.props.price}
                        order={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated} />
                </Fragment>
            )
            orderSummary = <OrderSummary
                purchaseContinue={this.purchaseContinueHandler}
                purchaseCancel={this.purchaseCancelHandler}
                ingredients={this.props.ings}
                totalPrice={this.props.price} />
        }
        return (
            <Fragment>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token,
        building: state.burgerBuilder.building
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));