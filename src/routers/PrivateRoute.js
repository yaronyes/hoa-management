import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoute = ({ auth, component: Component, ...rest }) => {
    useEffect(() => {
        console.log("PrivateRoute", auth.isAuthenticated);
        console.log("PrivateRoute", auth.user.isCommitteeMember);
     }, [auth])
    
    return (
        <Route {...rest} render={(props) => (            
            (!auth.isAuthenticated)
            ? <Component {...props} />            
            : auth.user.isCommitteeMember
            ? <Redirect to='/dashboard' />
            : <Redirect to={`/dashboard/${auth.user._id}`} />
        )} />
      )
} 
  
PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { })(PrivateRoute);