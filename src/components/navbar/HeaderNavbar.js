import React, { useState, useEffect } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";
import './HeaderNavbar.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser, updateUser } from '../../actions/authActions';
import { useHistory } from "react-router-dom";
import { clearIssues } from '../../actions/issueActions';
import { clearVoting } from '../../actions/votingActions';
import { clearMessages } from '../../actions/messageActions';
import { clearTenants } from '../../actions/tenantActions';

const HeaderNavbar = ({ logoutUser, updateUser, clearIssues, clearVoting, clearMessages, clearTenants, auth, selectedPage }) => {
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
      <MDBNavbar color="info-color-dark header-navbar-nav" dark expand="md">
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
          <MDBNavItem className="mr-4">
              <MDBDropdown className="user-menu">
                <MDBDropdownToggle nav caret>
                  <MDBIcon icon="user" />
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem toggle={false} onClick={() => updateUser({ cardMode: !auth.user.cardMode })} className="dropdown-user">
                      <MDBIcon icon={auth.user.cardMode ? "check-square" : "square"} className="mr-2" />
                      Card Mode</MDBDropdownItem>                  
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
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
    updateUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    clearIssues: PropTypes.func.isRequired,
    clearVoting: PropTypes.func.isRequired,
    clearMessages: PropTypes.func.isRequired,
    clearTenants: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
});
  
export default connect(mapStateToProps, { logoutUser, updateUser, clearIssues, clearVoting, clearMessages, clearTenants })(HeaderNavbar);