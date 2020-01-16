import React from 'react';

import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    //Use Object.keys on the ingridients props, to extract JUST THE KEYS as string, not the values
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            //Array is a JS method to create an array, props.ingredients[igKey] is the VALUE (number of the array items!!!
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                //Add key eg. cheese0 and the key name as type
                return <BurgerIngredient key={igKey + i} type={igKey} />
            }
            )
        })
        //How do we know if there is no ingredient yet?
        //reducedArr is a new array (second arguement), currentArrs are our original arrays
        .reduce((reducedArr, currentArr) => {
            return reducedArr.concat(currentArr)
        }, [])
    console.log(transformedIngredients)
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please add something to your burger!</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;