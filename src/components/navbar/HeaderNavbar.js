import React, { useState, useEffect } from "react";
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
    } from "mdbreact";
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

      console.log(auth.user);
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
              <MDBNavLink to={`/dashboard/${auth.user._id}`}>Tenants</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#!">Messages</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#!">Issues</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#!">Voting</MDBNavLink>
            </MDBNavItem>
            {/* <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <span className="mr-2">Dropdown</span>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">
                    Something else here
                  </MDBDropdownItem>
                  <MDBDropdownItem href="#!">
                    Something else here
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem> */}
          </MDBNavbarNav>
          <MDBNavbarNav right className={userConnected ? "hide-nav" : ""}>
            {/* <MDBNavItem>
              <MDBFormInline waves>
                <div className="md-form my-0">
                  <input
                    className="form-control mr-sm-2"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                  />
                </div>
              </MDBFormInline>
            </MDBNavItem> */}
            <MDBNavItem>
              <MDBNavLink to="#!">Login</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#!">Sign Up</MDBNavLink>
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