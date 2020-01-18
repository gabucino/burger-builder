import React, { Component, Fragment } from 'react';

import Burger from '../components/Burger/Burger';
import BuildControls from '../components/Burger/BuildControls/BuildControls';
import Modal from '../components/UI/Modal/Modal';
import OrderSummary from '../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../components/UI/Spinner/Spinner';

import axios from '../axios-orders'
import withErrorHandler from './../hoc/withErrorHandler/withErrorHandler'


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.7,
    meat: 1,
    bacon: 0.7
}
class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        //.json end is for firebase only!!!
        axios.get('https://burger-builder-a402a.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
            }
            ).catch(error => {
                this.setState({ error: true });
            })
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(igkey => {
            return ingredients[igkey]
        }).reduce((sum, el) => {
            return sum + el
        }, 0)
        this.setState({ purchasable: sum > 0 });

    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount + 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount
        const priceAddition = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice + priceAddition
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients)
    }


    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        if (oldCount === 0) {
            return
        }
        const updatedCount = oldCount - 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount
        const priceToSubtract = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice - priceToSubtract
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients)

    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        // alert('You continued')
        this.setState({ loading: true })
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPricecustomer,
            customer: {
                name: 'Gabi M',
                address: {
                    street: 'Krakowsia',
                    zip: '7632',
                    country: 'Poland'
                }, email: 'test@test.Component'
            }, deliveryMethod: 'fastest'
        }

        // .json is only needed because of firebase!!
        axios.post('/orders.json', order)
            .then(response => this.setState({ loading: false, purchasing: false }))
            .catch(error => this.setState({ loading: false, purchasing: false }))
    }


    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        /*ingredients = {
            cheese = true
        }*/

        let orderSummary = null

        let burger = this.state.error ? <p>Ingredients cant be loaded</p> : <Spinner />
//Without this check the initial data would fail, if there are no ingredients
        if (this.state.ingredients) {
            burger = (
                <Fragment>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        price={this.state.totalPrice}
                        order={this.purchaseHandler} />
                </Fragment>
            )
            orderSummary = <OrderSummary
                purchaseContinue={this.purchaseContinueHandler}
                purchaseCancel={this.purchaseCancelHandler}
                ingredients={this.state.ingredients}
                totalPrice={this.state.totalPrice} />
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
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

export default withErrorHandler(BurgerBuilder, axios);