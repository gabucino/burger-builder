import React, {Fragment} from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';


const NavigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem closed={props.closed} exact link="/" >Burger Builder</NavigationItem>
            {props.isAuthenticated
                ? <Fragment><NavigationItem closed={props.closed} link="/orders">Orders</NavigationItem>
                    <NavigationItem closed={props.closed} link="/logout">Logout</NavigationItem> </Fragment> :
                <NavigationItem closed={props.closed} link="/auth">Sign up</NavigationItem>}
        </ul>
    );
}

export default NavigationItems;