import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';                  
import TenantCard from '../../components/tenant/TenantCard';
import  { getTenantUsers } from '../../actions/tenantActions';
import './TenantsPage.css';
import AddUpdateTenant  from '../../components/tenant/AddUpdateTenant';
import RoundedBtn from '../../components/rounded-button/RoundedBtn';
import TenantFilters from '../../components/tenant/TenantFilters';
import selectTenants from '../../selectors/tenantSelector';

const TenantsPage = ({ getTenantUsers, tenants, filteredTenants }) => {
    const [collapseID, setCollapseID] = useState(0);        
    const [modal, setModel] = useState(false);
    const [selectedTenant, setSelectedTenant] = useState();

    useEffect(() => {
      if(tenants.length === 0) {
        getTenantUsers();
      }
    }, [tenants]);

    // useEffect(() => {
    //   if(selectedTenant) {
    //     setModel(!modal);
    //   }      
    // }, [selectedTenant]);

    const toggle = () => {
      setModel(!modal);
    }

    const openAddUpdateModal = (tenant) => {
      setSelectedTenant(tenant);      
      toggle();
    }

    const toggleCollapse = newCollapseID => setCollapseID(collapseID !== newCollapseID ? newCollapseID : '');

    const displayTenants = filteredTenants.map(item => <TenantCard key={item._id} toggleCollapse={toggleCollapse} tenant={item} openID={collapseID} onUpdateTenant={openAddUpdateModal}/>);

    return (
        <div className="tenants-page">
            <MDBContainer>
                <MDBRow>
                  <TenantFilters />
                </MDBRow>   
                <MDBRow>
                  <MDBCol className="add-tenant ml-auto" md="6" lg="4">
                    <RoundedBtn color="primary" onClick={() => openAddUpdateModal(undefined)} icon="user-plus" caption="Create New Tenant"/>
                  </MDBCol>                  
                </MDBRow>     
                <MDBRow>
                  <MDBContainer className='accordion md-accordion accordion-1'>
                    {displayTenants}                 
                  </MDBContainer>
                </MDBRow>        
            </MDBContainer>           
            <AddUpdateTenant modal={modal} toggle={toggle} tenantToUpdate={selectedTenant}/>
        </div>
    );
}

TenantsPage.propTypes = {
  errors: PropTypes.object.isRequired,
  tenants: PropTypes.array.isRequired,
  getTenantUsers: PropTypes.func.isRequired,
  filteredTenants: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors,
  tenants: state.tenant,
  filteredTenants: selectTenants(state.tenant, state.tenantFilters)
});

export default connect(mapStateToProps, { getTenantUsers })(TenantsPage);
