import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
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

    const displayTenants = filteredTenants.map(tenant => !auth.user.cardMode
    ? <TenantCard key={tenant._id} toggleCollapse={toggleCollapse} tenant={tenant} openID={collapseID} onUpdateTenant={openAddUpdateModal}/> 
    : <MDBCol key={tenant._id} lg="4" md="6" className="mt-4">
        <TenantCard key={tenant._id} toggleCollapse={toggleCollapse} tenant={tenant} openID={collapseID} onUpdateTenant={openAddUpdateModal} cardMode={true}/> 
      </MDBCol>); 

    const toDisplay = displayTenants.length > 0 ? displayTenants : <h3 className="h3-responsive mb-2 font-weight-bold">No tenants to show</h3>;

    const sortingNav = <AccordionNav showPlusIcon={auth.user.isCommitteeMember} plusClicked={() => openAddUpdateModal(null)} plusIcon="user-plus"
    showSortingDirectionIcon={filters.sortBy === 'createdAt'} sortingDirectionClicked={(isUp) => updateSortDirection(isUp ? "asc" : "desc")} floatingMode={auth.user.cardMode}  />

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
                { auth.user.cardMode 
                ? sortingNav
                : null }                  
                <MDBRow>
                {!auth.user.cardMode 
                 ? <MDBContainer className='accordion md-accordion accordion-1'>
                    {sortingNav}
                    {toDisplay}          
                  </MDBContainer>
                 :  toDisplay }
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
