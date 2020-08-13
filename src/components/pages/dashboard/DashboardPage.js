import React from 'react';
import CMDashboard from './CMDashboard';
import TenantDashboard from './TenantDashboard';
import { MDBContainer } from 'mdbreact';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const DashboardPage = ({ auth }) => {
    return (
        <div>
            <MDBContainer>
                { auth.user.isCommitteeMember
                ? <CMDashboard/>
                : <TenantDashboard/> }
            </MDBContainer>            
        </div>
    );
}


DashboardPage.propTypes = {
    auth: PropTypes.object.isRequired
  }
  
  const mapStateToProps = state => ({
      auth: state.auth
  });
  
export default connect(mapStateToProps, { })(DashboardPage);
