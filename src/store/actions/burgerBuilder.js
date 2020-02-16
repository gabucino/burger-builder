import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'



export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INTREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}


export const initIngredients = () => {
    //redux thunk allows us to use dispatch:
    return dispatch => {
        //.json end is for firebase only!!!
        axios.get('https://burger-builder-a402a.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data))
            }
            ).catch(error => {
                dispatch(fetchIngredientsFailed)
            })
    }
}

export const resetBuilding = () => {
    return {
        type: actionTypes.RESET_BUILDING,
        building: false
    }
}