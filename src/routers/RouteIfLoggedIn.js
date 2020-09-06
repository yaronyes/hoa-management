import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const RouteIfLoggedIn = ({ auth, redirectTo, children, ...rest }) => {

    return (
        <Route {...rest} render={(props) => (            
            (auth.isAuthenticated)
            ? children
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