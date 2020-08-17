import React, { useState, useEffect } from 'react';
import FilterBox from '../../components/filter/FilterBox';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';     
import { getIssues } from '../../actions/issueActions';
import RoundedBtn from '../../components/rounded-button/RoundedBtn';
import IssueCard from '../../components/issues/IssueCard';
import AddUpdateIssue from '../../components/issues/AddUpdateIssue';

const IssuesPage = ({ getIssues, issue }) => {
    const [collapseID, setCollapseID] = useState(0);    
    const [filterText, setFilter] = useState("");
    const [modal, setModel] = useState(false);
    const [selectedIssue, setSelectedIssue] = useState();

    useEffect(() => {
      if(issue.length === 0) {
        getIssues();
      }      
    }, [issue]);
   
    const toggle = () => {
      setModel(!modal);
    }

    const openAddUpdateModal = (theIssue) => {
      setSelectedIssue(theIssue);      
      toggle();
    }

    const toggleCollapse = newCollapseID => setCollapseID(collapseID !== newCollapseID ? newCollapseID : '');

    const filter = issue.filter(item => item.title.toLowerCase().includes(filterText.toLowerCase().trim()));
    const displayIssues= filter.map(item => <IssueCard key={item._id} toggleCollapse={toggleCollapse} theIssue={item} isOpen={collapseID} onUpdateIssue={openAddUpdateModal}/>);
  

    return (
        <div className="issues-page">
            <MDBContainer>
                <MDBRow>
                  <MDBCol className="filter-issue">
                    <FilterBox onFilterChanged={(text) => setFilter(text)} />
                  </MDBCol>                  
                </MDBRow>   
                <MDBRow>
                  <MDBCol className="add-issue offset-md-9" md="3">
                    <RoundedBtn color="primary" onClick={() => openAddUpdateModal(undefined)} icon="user-plus" caption="Create New Issue"/>
                  </MDBCol>                  
                </MDBRow>     
                <MDBRow>
                  <MDBContainer className='accordion md-accordion accordion-1'>
                    {displayIssues}                 
                  </MDBContainer>
                </MDBRow>             
            </MDBContainer>
            <AddUpdateIssue modal={modal} toggle={toggle} issueToUpdate={selectedIssue}/>                       
        </div>
    );
}

IssuesPage.propTypes = {
    errors: PropTypes.object.isRequired,
    issue: PropTypes.array.isRequired,
    getTenantUsers: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors,
    issue: state.issue
});

export default connect(mapStateToProps, { getIssues })(IssuesPage);
