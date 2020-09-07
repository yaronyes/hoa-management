import React, { useState, useEffect } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse } from "mdbreact";
import './HeaderNavbar.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { useHistory } from "react-router-dom";
import { clearIssues } from '../../actions/issueActions';
import { clearVoting } from '../../actions/votingActions';
import { clearMessages } from '../../actions/messageActions';
import { clearTenants } from '../../actions/tenantActions';

const HeaderNavbar = ({ logoutUser, clearIssues, clearVoting, clearMessages, clearTenants, auth, selectedPage }) => {
    const [isUserConnected, setIsUserConnected] = useState(false);  
    const [isOpen, setIsOpen] = useState(false);
    const history = useHistory();
       
    useEffect(() => {      
      if(!auth.isAuthenticated) {
        clearIssues();
        clearVoting();
        clearMessages();
        clearTenants();
        
        history.push('/');
      }
      
        setIsUserConnected(auth.isAuthenticated);
  }, [auth]);


    return (
    <div className="header-navbar">
      <MDBNavbar color="info-color-dark" dark expand="md">
        <MDBNavbarBrand className="brand">
          <MDBNavLink to="/">
            <strong className="white-text">HOA Systems</strong>
          </MDBNavLink>          
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={() => {setIsOpen(!isOpen)}} />
        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
          <MDBNavbarNav left className={!isUserConnected ? "hide-nav" : ""}>
            <MDBNavItem active={selectedPage === 'dashboard' ? true :  false}>
              <MDBNavLink to="/dashboard">Dashboard</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem active={selectedPage === 'tenants' ? true :  false}>
              <MDBNavLink to="/tenants" disabled={auth.user.isCommitteeMember ? false : true}>Tenants</MDBNavLink>
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
    auth: PropTypes.object.isRequired,
    clearIssues: PropTypes.func.isRequired,
    clearVoting: PropTypes.func.isRequired,
    clearMessages: PropTypes.func.isRequired,
    clearTenants: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
});
  
export default connect(mapStateToProps, { logoutUser, clearIssues, clearVoting, clearMessages, clearTenants })(HeaderNavbar);