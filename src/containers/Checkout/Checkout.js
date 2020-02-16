import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom'
import ContactData from './ContactData/ContactData';


import { connect } from 'react-redux'

class Checkout extends Component {



    //Extracting queryparams from the uri:

    // componentWillMount() {
    //     //URLSearchParams parses the url correctly
    //     const query = new URLSearchParams(this.props.location.search)
    //     const ingredients = {}
    //     let price = 0

    //     for (let param of query.entries()) {
    //         if (param[0] === 'price') {
    //             price = param[1]
    //         }
    //         else {
    //             ingredients[param[0]] = +param[1]
    //         }
    //     }
    //     this.setState({ ingredients: ingredients, totalPrice: price });
    // }

    checkoutCancelledHandler = () => {
        this.props.history.goBack()
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }


    render() {
        let summary = <Redirect to="/" />
        if (this.props.ings) {
            const purchasedRedirect  = this.props.purchased ? <Redirect to="/" /> : null
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        checkoutContinued={this.checkoutContinuedHandler}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        ingredients={this.props.ings} />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData} />
                </div>
            )
        }
        return summary
        // with render property you can pass down props:
        // render={(props) => (<ContactData
        //     ingredients={this.props.ings}
        //     price={this.state.totalPrice} 
        //Adding {...props} sends the routing props, like history as well -> good for using eg. redirect 
        // {...props} />)} 

    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        // price: state.totalPrice
        purchased: state.order.purchased
    }
}


export default connect(mapStateToProps)(Checkout);