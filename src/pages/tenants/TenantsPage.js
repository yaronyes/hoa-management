import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow } from 'mdbreact';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';                  
import TenantCard from '../../components/tenant/TenantCard';
import  { getTenantUsers } from '../../actions/tenantActions';
import './TenantsPage.css';
import AddUpdateTenant  from '../../components/tenant/AddUpdateTenant';
import TenantFilters from '../../components/tenant/TenantFilters';
import selectTenants from '../../selectors/tenantSelector';
import Spinner from '../../components/spinner/Spinner';
import { updateSortDirection } from '../../actions/tenantFilters';
import AccordionNav from '../../components/navbar/AccordionNav';

const TenantsPage = ({ loader, auth, getTenantUsers, filters, updateSortDirection, tenants, filteredTenants, onPageSelected }) => {
    const [collapseID, setCollapseID] = useState(0);        
    const [modal, setModel] = useState(false);
    const [selectedTenant, setSelectedTenant] = useState();

    useEffect(() => {
        onPageSelected('tenants');

        return () => updateSortDirection("asc");
    }, []);
    useEffect(() => {
      if(tenants.length === 0) {
        getTenantUsers();
      } else if(collapseID === 0 && filteredTenants.length > 0) {
        setCollapseID(filteredTenants[0]._id);
      }
    }, [tenants]);
    
    const toggle = () => {
      setModel(!modal);
    }

    const openAddUpdateModal = (tenant) => {
      setSelectedTenant(tenant);      
      toggle();
    }

    const toggleCollapse = newCollapseID => setCollapseID(collapseID !== newCollapseID ? newCollapseID : '');

    const displayTenants = filteredTenants.map(item => <TenantCard key={item._id} toggleCollapse={toggleCollapse} tenant={item} openID={collapseID} onUpdateTenant={openAddUpdateModal}/>);

    if(!auth.user.isCommitteeMember) {
      return null;
    }
    
    if(loader.loadingTenants) {
      return <Spinner fullPage={true} />
    }

    return (
        <div className="tenants-page">
            <MDBContainer>
                <MDBRow>
                  <TenantFilters />
                </MDBRow>                   
                <MDBRow>
                  <MDBContainer className='accordion md-accordion accordion-1'>
                    <AccordionNav showPlusIcon={auth.user.isCommitteeMember} plusClicked={() => openAddUpdateModal(null)} plusIcon="user-plus"
                    showSortingDirectionIcon={filters.sortBy === 'createdAt'} sortingDirectionClicked={(isUp) => updateSortDirection(isUp ? "asc" : "desc")}/>
                    { displayTenants.length > 0
                    ? displayTenants
                    : <h2 className="h2-responsive mb-2 font-weight-bold">No Tenants to show</h2> }                 
                  </MDBContainer>
                </MDBRow>        
            </MDBContainer>           
            <AddUpdateTenant modal={modal} toggle={toggle} tenantToUpdate={selectedTenant}/>
        </div>
    );
}

TenantsPage.propTypes = {
  auth: PropTypes.object.isRequired,
  loader: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  tenants: PropTypes.array.isRequired,
  filters: PropTypes.object.isRequired,
  getTenantUsers: PropTypes.func.isRequired,
  filteredTenants: PropTypes.array.isRequired,
  updateSortDirection: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  loader: state.loader,
  errors: state.errors,
  tenants: state.tenant,
  filters: state.tenantFilters,
  filteredTenants: selectTenants(state.tenant, state.tenantFilters)
});

export default connect(mapStateToProps, { getTenantUsers, updateSortDirection })(TenantsPage);
