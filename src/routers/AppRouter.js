import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HeaderNavbar from '../components/navbar/HeaderNavbar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { checkForConnectedUser } from '../actions/authActions';
import HomePage from '../pages/homepage/HomePage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import PrivateRoute from './PrivateRoute';
import MessagesPage from '../pages/messages/MessagesPage';
import TenantsPage from '../pages/tenants/TenantsPage';
import VotingPage from '../pages/voting/VotingPage';
import IssuesPage from '../pages/issues/IssuesPage';
import SignUpPage from '../pages/signup/SignUpPage';
import LoginPage from  '../pages/login/LoginPage';
import RouteIfLoggedIn from './RouteIfLoggedIn';
import NotFoundPage from '../pages/not-found/NotFoundPage';
import WebSocketClient from '../components/websocket/WebSocketClient';

const AppRouter = ({ checkForConnectedUser, auth, errors }) => {       
    //const [isUserConnected, setIsUserConnected] = useState(false);

    useEffect(() => {
        checkForConnectedUser();
    }, [])

    // useEffect(() => {
    //     setIsUserConnected(auth.isAuthenticated);
    // }, [auth]);

    useEffect(() => {
        console.log("Error:", errors);
    }, [errors]);


    return (
        <BrowserRouter>
            <HeaderNavbar/>
                <Switch>
                    <PrivateRoute exact path="/" redirectTo="/dashboard" /*component={HomePage}*/ >
                        <HomePage />
                    </PrivateRoute>  
                    <RouteIfLoggedIn exact path="/dashboard" redirectTo="/" /*component={DashboardPage}*/ >
                        <DashboardPage/>
                    </RouteIfLoggedIn>                        
                    <RouteIfLoggedIn exact path="/messages" redirectTo="/" /*component={MessagesPage}*/>
                        <MessagesPage />
                    </RouteIfLoggedIn>                        
                    <RouteIfLoggedIn exact path="/tenants" redirectTo="/" /*component={TenantsPage}*/ >
                        <TenantsPage />
                    </RouteIfLoggedIn> 
                    <RouteIfLoggedIn exact path="/voting" redirectTo="/" /*component={VotingPage}*/ >
                        <VotingPage />
                    </RouteIfLoggedIn>
                    <RouteIfLoggedIn exact path="/issues" redirectTo="/" /*component={IssuesPage}*/ >
                        <IssuesPage />
                    </RouteIfLoggedIn>
                    <Route exact path='/signup'>
                        <SignUpPage/>
                    </Route>
                    <Route exact path='/login'>
                        <LoginPage/>
                    </Route>
                    <Route component={NotFoundPage} />
                </Switch>
            <WebSocketClient />
        </BrowserRouter>
    );
}

AppRouter.propTypes = {
    checkForConnectedUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(mapStateToProps, { checkForConnectedUser })(AppRouter);