import React from 'react';
import classes from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom'

const navigationItem = (props) => {
    return (<li className={classes.NavigationItem}>
        <NavLink
            exact={props.exact}
            //css modules converts classnames into  something like active__1223f
            //we need to define activeclassname in order to match the correct class
            onClick={props.closed}
            activeClassName={classes.active}
            to={props.link}>
            {props.children}</NavLink>
    </li>);
}

export default navigationItem;