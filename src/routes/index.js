import React from "react";
import {
    makeStyles,
    Grid
} from '@material-ui/core';
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { Toast } from "../components/Toast";

import Dashboard from "../components/Dashboard";
import Navbar from "../components/Navbar";
import Sample from "../components/Sample";

// import SignIn from "../components/auth/SignIn";
// import Register from "../components/auth/Register";
//import ForgotPassword from "../components/auth/ForgotPassword";
const drawerWidth = 240;
const color = "rgb(16, 185, 129)";
const useStyles = makeStyles((theme) => ({
    base: {
        display: 'flex',
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

const auth = {
    token: null,
    isAuthenticated: null,
};



// Routes is the function which navigates throughout the application
const Routes = ({ isAuthenticated, token, alert }) => {
    const classes = useStyles();
    auth.isAuthenticated = isAuthenticated;
    auth.token = token;
    return (
        <>
            <div className={classes.base}>
                <Navbar />
                <div className={classes.content}>
                    <div className={classes.toolbar} />
                    <Switch>
                        <Route path="/" exact component={Dashboard} />
                        <Route path="/Dashboard" exact component={Dashboard} />
                        <Route path="/Sample" component={Sample} />
                        {/* <RouteProtected path="/" exact component={} /> */}
                    </Switch>
                </div>
            </div>
        </>
    );
}

// RouteProtected is used to protect the routes
// Protected routes verify the token and isAuthenticated from your store.
// Component parameter renders the component
// and ...rest parameter is props of the component that you are passing
const RouteProtected = ({ component: Component, alert, ...rest }) => {
    const classes = useStyles();
    return (
        <Route
            {...rest}
            render={(props) =>
                auth.isAuthenticated && auth.token !== null ? (

                    <Grid container justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.appbar}>
                            {/* <Appbar /> */}
                            <Toast />
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={11}>
                            <Component {...props} />
                        </Grid>
                    </Grid>

                ) : (
                    <Redirect to="/" />
                )
            }
        />
    );
};

const mapStateToProps = (state) => {
    // console.log("Routes : ", state.auth);
    return {
        // isAuthenticated: state.auth.isAuthenticated,
        // token: state.auth.token,
    };
};
export default connect(mapStateToProps, {})(Routes);
