import React, { useEffect } from 'react';
import { MDBCol } from 'mdbreact';
import FilterBox from '../filter/FilterBox';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';     
import { setTextFilter } from '../../actions/tenantFilters';
import './TenantFilters.css';

const TenantFilters = ({ setTextFilter }) => {
    
    useEffect(() => {
        setTextFilter('');

        return () => setTextFilter('');
    }, []);

    return (
        <div className="filter-tenant">
            <MDBCol>
                <FilterBox onFilterChanged={(text) => setTextFilter(text)} />
            </MDBCol>  
        </div>
    );
};

TenantFilters.propTypes = {    
    setTextFilter: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    
});
  
const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(TenantFilters);
  