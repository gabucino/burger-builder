import React, { Fragment } from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop'
import classes from './SideDrawer.module.css'

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close]
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open]
    }
    return (
        <Fragment>
            <Backdrop clicked={props.closed} show={props.open}/>
            <div className={attachedClasses.join(' ')}>
                <Logo height="11%" marginBottom="32px" />
                <nav>
                    <NavigationItems 
                    closed={props.closed} 
                    isAuthenticated={props.isAuth}/>
                </nav>
            </div>
        </Fragment>
    );
}

export default sideDrawer;