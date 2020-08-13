import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Test from '../components/Test';
import HeaderNavbar from '../components/navbar/HeaderNavbar';
import { MDBContainer } from 'mdbreact';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { checkForConnectedUser } from '../actions/authActions';
import HomePage from '../components/pages/homepage/HomePage';
import CMDashboardPage from '../components/pages/dashboard/CMDashboardPage';
import TenantDashboardPage from '../components/pages/dashboard/TenantDashboardPage';
import PrivateRoute from './PrivateRoute';

const AppRouter = ({ checkForConnectedUser, auth, errors }) => {       
    const [isUserConnected, setIsUserConnected] = useState(false);

    useEffect(() => {
        console.log("checkForConnectedUser")
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
            {/* <MDBContainer> */}
                <Switch>
                    {/* <Route exact path="/">                        
                        <HomePage/>       
                        <Test/>                 
                    </Route> */}
                    <PrivateRoute exact path="/" component={HomePage} >                        
                        {/* <HomePage/>        */}
                        {/* <Test/>                  */}
                    </PrivateRoute>
                    <Route exact path="/dashboard">
                        <CMDashboardPage/>
                    </Route>
                    <Route exact path="/dashboard/:id">
                        <TenantDashboardPage/>
                    </Route>                                   
                </Switch>
            {/* </MDBContainer>           */}
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