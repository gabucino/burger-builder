import React, { Fragment, Component } from 'react';
import classes from './Layout.module.css'
import Toolbar from '../Navingation/Toolbar/Toolbar'
import SideDrawer from '../Navingation/SideDrawer/SideDrawer';



class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }


    //setstate is async - use a function to make sure u are using the latest state
    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        });
    }

    render() {
        return (
            <Fragment>
                <Toolbar
                    toggleSideDrawer={this.sideDrawerToggleHandler} />
                <SideDrawer
                    closed={this.sideDrawerClosedHandler}
                    open={this.state.showSideDrawer} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Fragment>
        )
    }
}


export default Layout