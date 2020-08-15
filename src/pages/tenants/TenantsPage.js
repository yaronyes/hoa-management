import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';                  
import TenantCard from '../../components/tenant/TenantCard';
import  { addTenantUser, getTenantUsers } from '../../actions/tenantActions';
import './TenantsPage.css';
import FilterBox from '../../components/filter/FilterBox';

const TenantsPage = ({ addTenantUser, getTenantUsers, tenant }) => {
    const [collapseID, setCollapseID] = useState(0);    
    const [filterText, setFilter] = useState("");

    useEffect(() => {
      if(tenant.length === 0) {
        getTenantUsers();
      }
      console.log("tenant:", tenant);
    }, [tenant]);

    const toggleCollapse = newCollapseID => setCollapseID(collapseID !== newCollapseID ? newCollapseID : '')

    const filter = tenant.filter(item => item.name.toLowerCase().includes(filterText.toLowerCase().trim()))
    const displayTenants = filter.map(item => <TenantCard toggleCollapse={toggleCollapse} tenant={item} isOpen={collapseID}/>);

    return (
        <div className="tenants-page">
            <MDBContainer>
                <MDBRow>
                  <MDBCol className="filter-tenant">
                    <FilterBox onFilterChanged={(text) => setFilter(text)} />
                  </MDBCol>                  
                </MDBRow>     
                <MDBRow>
                  <MDBContainer className='accordion md-accordion accordion-1'>
                    {displayTenants}                 
                  </MDBContainer>
                </MDBRow>        
            </MDBContainer>           
        </div>
    );
}

TenantsPage.propTypes = {
  errors: PropTypes.object.isRequired,
  tenant: PropTypes.array.isRequired,
  addTenantUser: PropTypes.func.isRequired,
  getTenantUsers: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors,
  tenant: state.tenant
});

export default connect(mapStateToProps, { addTenantUser, getTenantUsers })(TenantsPage);
