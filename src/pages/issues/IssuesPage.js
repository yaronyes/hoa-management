import React, { useState, useEffect } from 'react';
import FilterBox from '../../components/filter/FilterBox';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';     
import { getIssues } from '../../actions/issueActions';
import RoundedBtn from '../../components/rounded-button/RoundedBtn';
import IssueCard from '../../components/issues/IssueCard';
import AddUpdateIssue from '../../components/issues/AddUpdateIssue';
import './IssuesPage.css';
import RadioButtonsGroup from '../../components/radio-buttons/RadioButtonsGroup';
import { compareByDate, compareByPriority } from '../../utils/utils';

const IssuesPage = ({ getIssues, issues, auth }) => {
    const [collapseID, setCollapseID] = useState(0);    
    const [filterText, setFilter] = useState("");
    const [modal, setModel] = useState(false);
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [sortBy, setSortBy] = useState("createdAt");

    useEffect(() => {
      if(issues.length === 0) {
        getIssues();
      }      
    }, [issues]);
   
    const toggle = () => {
      setModel(!modal);
    }

    const openAddUpdateModal = (issue) => {
      setSelectedIssue(issue);      
      toggle();
    }
    
    const toggleCollapse = newCollapseID => setCollapseID(collapseID !== newCollapseID ? newCollapseID : '');

    const priorities = {
      urgent: 1,
      important: 2,
      normal: 3
    }

    const filter = issues.filter(item => item.title.toLowerCase().includes(filterText.toLowerCase().trim()));
    filter.sort((a, b) => sortBy === 'createdAt' ? compareByDate(a[sortBy], b[sortBy]) : compareByPriority(a[sortBy], b[sortBy], priorities));
    const displayIssues= filter.map(item => <IssueCard key={item._id} toggleCollapse={toggleCollapse} issue={item} openID={collapseID} onUpdateIssue={openAddUpdateModal}/>);
  

    return (
        <div className="issues-page">
            <MDBContainer>
                <MDBRow>
                  <MDBCol className="filter-issue">
                    <FilterBox onFilterChanged={(text) => setFilter(text)} />
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
                    defaultSelect={sortBy}
                    onChange={(selected) => setSortBy(selected)}
                    />                 
              </MDBCol>         
              : null }
                </MDBRow>   
                <MDBRow>
                  <MDBCol className={auth.user.isCommitteeMember ? "add-issue-hide" : "ml-auto"} md="6" lg="4">
                    <RoundedBtn color="primary" onClick={() => openAddUpdateModal(null)} icon="user-plus" caption="Create New Issue"/>
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
    issues: PropTypes.array.isRequired,
    getIssues: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    issues: state.issue
});

export default connect(mapStateToProps, { getIssues })(IssuesPage);
