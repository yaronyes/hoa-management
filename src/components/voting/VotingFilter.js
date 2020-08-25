import React, { useEffect } from 'react';
import { MDBCol } from 'mdbreact';
import FilterBox from '../filter/FilterBox';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';     
import { setTextFilter } from '../../actions/votingFilters';
import './VotingFilter.css';

const VotingFilter = ({ setTextFilter }) => {    
    useEffect(() => {
        setTextFilter("");

        return () => setTextFilter('');
    }, []);

    return (
        <div className="filter-voting">
            <MDBCol>
                <FilterBox onFilterChanged={(text) => setTextFilter(text)} label="Filter by text in Title and Details"/>
            </MDBCol> 
        </div>
    );
};

VotingFilter.propTypes = {    
    setTextFilter: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({    
    //filters: state.votingFilters
});
  
const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text)),    
});
  
export default connect(mapStateToProps, mapDispatchToProps)(VotingFilter);
  