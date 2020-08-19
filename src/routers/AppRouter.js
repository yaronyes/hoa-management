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

const AppRouter = ({ checkForConnectedUser, auth, errors }) => {       
    const [isUserConnected, setIsUserConnected] = useState(false);

    useEffect(() => {
        checkForConnectedUser();
    }, [])

    useEffect(() => {
        setIsUserConnected(auth.isAuthenticated);
    }, [auth]);

    useEffect(() => {
        console.log("Error:", errors);
    }, [errors]);


    return (
        <BrowserRouter>
            <HeaderNavbar userConnected={isUserConnected}/>
                <Switch>
                    <PrivateRoute exact path="/" redirectTo="/dashboard" component={HomePage} />  
                    {/* <Route exact path="/">
                        <HomePage/>
                    </Route> */}
                    <RouteIfLoggedIn exact path="/dashboard" redirectTo="/" component={DashboardPage} />                        
                    {/* <Route exact path="/dashboard">
                        <DashboardPage/>
                    </Route> */}
                    <RouteIfLoggedIn exact path="/messages" redirectTo="/" component={MessagesPage} />                        
                    {/* <Route exact path='/messages'>
                        <MessagesPage/>
                    </Route> */}
                    <RouteIfLoggedIn exact path="/tenants" redirectTo="/" component={TenantsPage} /> 
                    {/* <Route exact path='/tenants'>
                        <TenantsPage/>
                    </Route> */}
                    <RouteIfLoggedIn exact path="/voting" redirectTo="/" component={VotingPage} /> 
                    {/* <Route exact path='/voting'>
                        <VotingPage/>
                    </Route> */}
                    <RouteIfLoggedIn exact path="/issues" redirectTo="/" component={IssuesPage} /> 
                    {/* <Route exact path='/issues'>
                        <IssuesPage/>
                    </Route> */}
                    <Route exact path='/signup'>
                        <SignUpPage/>
                    </Route>
                    <Route exact path='/login'>
                        <LoginPage/>
                    </Route>
                    {/* <Route exact path="/dashboard/:id">
                        <TenantDashboardPage/>
                    </Route>                                    */}
                </Switch>
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