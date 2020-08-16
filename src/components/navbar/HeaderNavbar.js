import React, { useState, useEffect } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse } from "mdbreact";
import './HeaderNavbar.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { useHistory } from "react-router-dom";

const HeaderNavbar = ({ userConnected, logoutUser, auth }) => {
    const [isOpen, setIsOpen] = useState(false);
    const history = useHistory();
    
    useEffect(() => {
      if(!userConnected) {
        history.push('/')
      }
    });    

    return (
    <div className="header-navbar">
      <MDBNavbar color="#f50057 pink accent-3" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text">HOA Systems</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={() => {setIsOpen(!isOpen)}} />
        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
          <MDBNavbarNav left className={!userConnected ? "hide-nav" : ""}>
            <MDBNavItem>
              <MDBNavLink to="/dashboard">Dashboard</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/tenants">Tenants</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/messages">Messages</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/issues">Issues</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/voting">Voting</MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right className={userConnected ? "hide-nav" : ""}>
            <MDBNavItem>
              <MDBNavLink to="#!">Login</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/signup">Sign Up</MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right className={!userConnected ? "hide-nav" : ""}>
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