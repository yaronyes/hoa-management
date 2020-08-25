import React from 'react';
import { MDBCol } from 'mdbreact';
import FilterBox from '../filter/FilterBox';
import RadioButtonsGroup from '../radio-buttons/RadioButtonsGroup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';     
import { setTextFilter } from '../../actions/tenantFilters';
import './TenantFilters.css';

const TenantFilters = ({ setTextFilter, auth, filters }) => {
    
    return (
        <div className="filter-tenant">
            <MDBCol>
                <FilterBox onFilterChanged={(text) => setTextFilter(text)} />
            </MDBCol>  
        </div>
    );
};

TenantFilters.propTypes = {    
    filters: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    setTextFilter: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    filters: state.tenantFilters
});
  
const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(TenantFilters);
  