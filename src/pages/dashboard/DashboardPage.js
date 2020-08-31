import React, { useEffect } from 'react';
import CMDashboard from '../../components/dashboard/CMDashboard';
import TenantDashboard from '../../components/dashboard/TenantDashboard';
import { MDBContainer } from 'mdbreact';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const DashboardPage = ({ auth, onPageSelected }) => {
    useEffect(() => onPageSelected('dashboard'), []);

    return (
        <div>
            <MDBContainer fluid>
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
