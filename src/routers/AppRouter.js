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
import ContactPage from '../pages/contact/ContactPage';

const AppRouter = ({ checkForConnectedUser, auth, errors }) => {       
    const [selectedPage, setSelectedPage] = useState('');

    useEffect(() => {
        checkForConnectedUser();
    }, [])

    useEffect(() => {
        console.log("Error:", errors);
    }, [errors]);

    const updateSelectedPage = (page) => setSelectedPage(page);

    const style = {
        position: "relative",
        minHeight: "100vh"
    }

    return (
        <BrowserRouter>
            <div style={style}>
                <div className={selectedPage !== "homepage" ? "page-container" : ""}>
                    <HeaderNavbar selectedPage={selectedPage}/>
                        <Switch>
                            <PrivateRoute exact path="/" redirectTo="/dashboard">
                                <HomePage onPageSelected={updateSelectedPage} />
                            </PrivateRoute>  
                            <RouteIfLoggedIn exact path="/dashboard" redirectTo="/">
                                <DashboardPage onPageSelected={updateSelectedPage} />
                            </RouteIfLoggedIn>                        
                            <RouteIfLoggedIn exact path="/messages" redirectTo="/">
                                <MessagesPage onPageSelected={updateSelectedPage} />
                            </RouteIfLoggedIn>                        
                            <RouteIfLoggedIn exact path="/messages/:messageId" redirectTo="/">
                                <MessagesPage onPageSelected={updateSelectedPage} />
                            </RouteIfLoggedIn>
                            <RouteIfLoggedIn exact path="/tenants" redirectTo="/">
                                <TenantsPage onPageSelected={updateSelectedPage} />
                            </RouteIfLoggedIn> 
                            <RouteIfLoggedIn exact path="/voting" redirectTo="/">
                                <VotingPage onPageSelected={updateSelectedPage} />
                            </RouteIfLoggedIn>
                            <RouteIfLoggedIn exact path="/voting/:votingId" redirectTo="/">
                                <VotingPage onPageSelected={updateSelectedPage} />
                            </RouteIfLoggedIn>
                            <RouteIfLoggedIn exact path="/issues" redirectTo="/">
                                <IssuesPage onPageSelected={updateSelectedPage} />
                            </RouteIfLoggedIn>
                            <RouteIfLoggedIn exact path="/issues/:issueId" redirectTo="/">
                                <IssuesPage onPageSelected={updateSelectedPage} />
                            </RouteIfLoggedIn>
                            <Route exact path='/signup'>
                                <SignUpPage onPageSelected={updateSelectedPage} />
                            </Route>
                            <Route exact path='/login'>
                                <LoginPage onPageSelected={updateSelectedPage}/>
                            </Route>
                            <Route exact path='/contact'>
                                <ContactPage onPageSelected={updateSelectedPage}/>
                            </Route>
                            <Route component={NotFoundPage} />
                        </Switch>
                    <MessagingClient />
                </div>
                <div>
                <   Footer selectedPage={selectedPage} />
                </div>
            </div>                
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