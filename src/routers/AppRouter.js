import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HeaderNavbar from '../components/navbar/HeaderNavbar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { checkForConnectedUser } from '../actions/authActions';
import HomePage from '../components/pages/homepage/HomePage';
import DashboardPage from '../components/pages/dashboard/DashboardPage';
import PrivateRoute from './PrivateRoute';

const AppRouter = ({ checkForConnectedUser, auth, errors }) => {       
    const [isUserConnected, setIsUserConnected] = useState(false);

    useEffect(() => {
        checkForConnectedUser();
    }, [])

    useEffect(() => {
        console.log(auth.isAuthenticated)
        setIsUserConnected(auth.isAuthenticated);
    }, [auth]);

    useEffect(() => {
        console.log("Error:", errors);
    }, [errors]);


    return (
        <BrowserRouter>
            <HeaderNavbar userConnected={isUserConnected}/>
                <Switch>
                    <PrivateRoute exact path="/" component={HomePage} />                        
                    <Route exact path="/dashboard">
                        <DashboardPage/>
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