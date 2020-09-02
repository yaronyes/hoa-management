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
import MessagingClient from '../components/websocket/MessagingClient';
import Footer from '../components/footer/Footer';

const AppRouter = ({ checkForConnectedUser, auth, errors }) => {       
    const [selectedPage, setSelectedPage] = useState('');

    useEffect(() => {
        checkForConnectedUser();
    }, [])

    // useEffect(() => {
    //     setIsUserConnected(auth.isAuthenticated);
    // }, [auth]);

    useEffect(() => {
        console.log("Error:", errors);
    }, [errors]);

    const updateSelectedPage = (page) => setSelectedPage(page);

    return (
        <BrowserRouter>
            <HeaderNavbar selectedPage={selectedPage}/>
                <Switch>
                    <PrivateRoute exact path="/" redirectTo="/dashboard" /*component={HomePage}*/ >
                        <HomePage onPageSelected={updateSelectedPage} />
                    </PrivateRoute>  
                    <RouteIfLoggedIn exact path="/dashboard" redirectTo="/" /*component={DashboardPage}*/ >
                        <DashboardPage onPageSelected={updateSelectedPage} />
                    </RouteIfLoggedIn>                        
                    <RouteIfLoggedIn exact path="/messages" redirectTo="/" /*component={MessagesPage}*/>
                        <MessagesPage onPageSelected={updateSelectedPage} />
                    </RouteIfLoggedIn>                        
                    <RouteIfLoggedIn exact path="/messages/:messageId" redirectTo="/" /*component={MessagesPage}*/>
                        <MessagesPage onPageSelected={updateSelectedPage} />
                    </RouteIfLoggedIn>
                    <RouteIfLoggedIn exact path="/tenants" redirectTo="/" /*component={TenantsPage}*/ >
                        <TenantsPage onPageSelected={updateSelectedPage} />
                    </RouteIfLoggedIn> 
                    <RouteIfLoggedIn exact path="/voting" redirectTo="/" /*component={VotingPage}*/ >
                        <VotingPage onPageSelected={updateSelectedPage} />
                    </RouteIfLoggedIn>
                    <RouteIfLoggedIn exact path="/voting/:votingId" redirectTo="/" /*component={VotingPage}*/ >
                        <VotingPage onPageSelected={updateSelectedPage} />
                    </RouteIfLoggedIn>
                    <RouteIfLoggedIn exact path="/issues" redirectTo="/" /*component={IssuesPage}*/ >
                        <IssuesPage onPageSelected={updateSelectedPage} />
                    </RouteIfLoggedIn>
                    <RouteIfLoggedIn exact path="/issues/:issueId" redirectTo="/" /*component={IssuesPage}*/ >
                        <IssuesPage onPageSelected={updateSelectedPage} />
                    </RouteIfLoggedIn>
                    <Route exact path='/signup'>
                        <SignUpPage onPageSelected={updateSelectedPage} />
                    </Route>
                    <Route exact path='/login'>
                        <LoginPage onPageSelected={updateSelectedPage}/>
                    </Route>
                    <Route component={NotFoundPage} />
                </Switch>
            <MessagingClient />
            <Footer />
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