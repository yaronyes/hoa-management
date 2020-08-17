import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';                  
import TenantCard from '../../components/tenant/TenantCard';
import  { getTenantUsers } from '../../actions/tenantActions';
import './TenantsPage.css';
import FilterBox from '../../components/filter/FilterBox';
import AddUpdateTenant  from '../../components/tenant/AddUpdateTenant';
import RoundedBtn from '../../components/rounded-button/RoundedBtn';

const TenantsPage = ({ getTenantUsers, tenant }) => {
    const [collapseID, setCollapseID] = useState(0);    
    const [filterText, setFilter] = useState("");
    const [modal, setModel] = useState(false);
    const [selectedTenant, setSelectedTenant] = useState();

    useEffect(() => {
      if(tenant.length === 0) {
        getTenantUsers();
      }
    }, [tenant]);

    // useEffect(() => {
    //   if(selectedTenant) {
    //     setModel(!modal);
    //   }      
    // }, [selectedTenant]);

    const toggle = () => {
      setModel(!modal);
    }

    const openAddUpdateModal = (theTenant) => {
      setSelectedTenant(theTenant);      
      toggle();
    }

    const toggleCollapse = newCollapseID => setCollapseID(collapseID !== newCollapseID ? newCollapseID : '');

    const filter = tenant.filter(item => item.name.toLowerCase().includes(filterText.toLowerCase().trim()));
    const displayTenants = filter.map(item => <TenantCard key={item._id} toggleCollapse={toggleCollapse} theTenant={item} isOpen={collapseID} onUpdateTenant={openAddUpdateModal}/>);

    return (
        <div className="tenants-page">
            <MDBContainer>
                <MDBRow>
                  <MDBCol className="filter-tenant">
                    <FilterBox onFilterChanged={(text) => setFilter(text)} />
                  </MDBCol>                  
                </MDBRow>   
                <MDBRow>
                  <MDBCol className="add-tenant offset-md-9" md="3">
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
  tenant: PropTypes.array.isRequired,
  getTenantUsers: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors,
  tenant: state.tenant
});

export default connect(mapStateToProps, { getTenantUsers })(TenantsPage);
