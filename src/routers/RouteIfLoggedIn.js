import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const RouteIfLoggedIn = ({ auth, redirectTo, component: Component, ...rest }) => {
    // useEffect(() => {

    //  }, [auth])
    return (
        <Route {...rest} render={(props) => (            
            (auth.isAuthenticated)
            ? <Component {...props} />            
            : <Redirect to={redirectTo} />            
        )} />
      )
} 
  
RouteIfLoggedIn.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { })(RouteIfLoggedIn);