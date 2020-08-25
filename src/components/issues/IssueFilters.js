import React, { useState } from 'react';
import { MDBCol } from 'mdbreact';
import FilterBox from '../filter/FilterBox';
import RadioButtonsGroup from '../radio-buttons/RadioButtonsGroup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';     
import { setTextFilter, sortByDate, sortByPriority } from '../../actions/issueFilters';
import './IssueFilters.css';

const IssueFilters = ({ setTextFilter, sortByDate, sortByPriority, auth, filters }) => {
    
    useState(() => {
        sortByDate();
        setTextFilter('');
    }, []);
    
    const setSortBy = selected => selected === 'createdAt' ? sortByDate() : sortByPriority();
    
    return (
        <div className="filter-issue">
            <MDBCol >
                <FilterBox onFilterChanged={(text) => setTextFilter(text)} label="Filter by Title" />
            </MDBCol>
            { auth.user.isCommitteeMember
            ? <MDBCol md="4">
            <RadioButtonsGroup
            label="Sort by:" radioBtnInfo={[
                {
                value: "createdAt",
                label: "Date"
                },
                {
                value: "priority",
                label: "Priority"
                }
            ]} 
            defaultSelect={filters.sortBy}
            onChange={(selected) => setSortBy(selected)}
            />                 
        </MDBCol>         
        : null }
        </div>
    );
};

IssueFilters.propTypes = {    
    filters: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    setTextFilter: PropTypes.func.isRequired,
    sortByDate: PropTypes.func.isRequired,
    sortByPriority: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    filters: state.issueFilters
});
  
const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortByDate: () => dispatch(sortByDate()),
    sortByPriority: () => dispatch(sortByPriority()),
});
  
export default connect(mapStateToProps, mapDispatchToProps)(IssueFilters);
  