import React, { useEffect} from 'react';
import { MDBCol } from 'mdbreact';
import FilterBox from '../filter/FilterBox';
import RadioButtonsGroup from '../radio-buttons/RadioButtonsGroup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';     
import { setTextFilter, sortByDate, sortByPriority, setPriorityFilter } from '../../actions/messageFilters';
import './MessageFilters.css';
import DropDownSelect from '../select/DropDownSelect';

const MessageFilters = ({ setTextFilter, sortByDate, sortByPriority, setPriorityFilter, auth, filters }) => {
    
    useEffect(() => {
        setTextFilter('');
        setPriorityFilter('');
        sortByDate();

        return () => {
            setTextFilter('');
            setPriorityFilter('');
            sortByDate();
        }
    }, []);

    const setSortBy = selected => selected === 'createdAt' ? sortByDate() : sortByPriority();
    
    return (
        <div className="filter-message">
            <MDBCol md="5">
                <FilterBox onFilterChanged={(text) => setTextFilter(text)} />
              </MDBCol>                 
              <MDBCol md="3">
              <DropDownSelect onChange={(priority) => setPriorityFilter(priority)} icon="exclamation" label="Filter by Priority"
                            dropDownItems={[
                                {
                                    value: "important",
                                    name: "important"
                                },
                                {
                                    value: "info",
                                    name: "info"
                                }
                            ]}/>  
              </MDBCol>
              <MDBCol md="4">
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
        </div>
    );
};

MessageFilters.propTypes = {    
    filters: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    setTextFilter: PropTypes.func.isRequired,
    sortByDate: PropTypes.func.isRequired,
    sortByPriority: PropTypes.func.isRequired,
    setPriorityFilter: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    filters: state.messageFilters
});
  
const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortByDate: () => dispatch(sortByDate()),
    sortByPriority: () => dispatch(sortByPriority()),
    setPriorityFilter: (priority) => dispatch(setPriorityFilter(priority))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(MessageFilters);
  