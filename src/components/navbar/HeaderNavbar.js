import React, { useState, useEffect } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse } from "mdbreact";
import './HeaderNavbar.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { useHistory } from "react-router-dom";

const HeaderNavbar = ({ logoutUser, auth, selectedPage }) => {
    const [isUserConnected, setIsUserConnected] = useState(false);  
    const [isOpen, setIsOpen] = useState(false);
    const history = useHistory();
    
    // useEffect(() => {
    //   if(!userConnected) {
    //     history.push('/')
    //   }
    // });    

    useEffect(() => {      
      if(!auth.isAuthenticated) {
         history.push('/')
      }
      
        setIsUserConnected(auth.isAuthenticated);
  }, [auth]);


    return (
    <div className="header-navbar">
      <MDBNavbar color="cyan darken-4" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text">HOA Systems</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={() => {setIsOpen(!isOpen)}} />
        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
          <MDBNavbarNav left className={!isUserConnected ? "hide-nav" : ""}>
            <MDBNavItem active={selectedPage === 'dashboard' ? true :  false}>
              <MDBNavLink to="/dashboard">Dashboard</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem active={selectedPage === 'tenants' ? true :  false}>
              <MDBNavLink to="/tenants">Tenants</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem active={selectedPage === 'messages' ? true :  false}>
              <MDBNavLink to="/messages">Messages</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem active={selectedPage === 'issues' ? true :  false}>
              <MDBNavLink to="/issues">Issues</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem active={selectedPage === 'voting' ? true :  false}>
              <MDBNavLink to="/voting">Voting</MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right className={isUserConnected ? "hide-nav" : ""}>
            <MDBNavItem active={selectedPage === 'login' ? true :  false}>
              <MDBNavLink to="/login">Login</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem active={selectedPage === 'signup' ? true :  false}>
              <MDBNavLink to="/signup">Sign Up</MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right className={!isUserConnected ? "hide-nav" : ""}>
            <MDBNavItem>
              <MDBNavLink to="/" onClick={() => logoutUser()}>Logout</MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    </div>
  );
};

HeaderNavbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    // loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
    // errors: PropTypes.object.isRequired,
    // tenant: PropTypes.array.isRequired,
    // addTenantUser: PropTypes.func.isRequired,
    // getTenantUsers: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    // errors: state.errors,
    // tenant: state.tenant
});
  
export default connect(mapStateToProps, { logoutUser })(HeaderNavbar);