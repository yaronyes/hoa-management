import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';     
import { getIssues } from '../../actions/issueActions';
import RoundedBtn from '../../components/rounded-button/RoundedBtn';
import IssueCard from '../../components/issues/IssueCard';
import AddUpdateIssue from '../../components/issues/AddUpdateIssue';
import './IssuesPage.css';
import selectIssues from '../../selectors/issueSelector';
import IssueFilters from '../../components/issues/IssueFilters';
import Spinner from '../../components/spinner/Spinner';
import { useParams } from 'react-router-dom';

const IssuesPage = ({ loader, getIssues, issues, auth, filteredIssue, onPageSelected }) => {
    const [collapseID, setCollapseID] = useState(0);    
    const [modal, setModel] = useState(false);
    const [selectedIssue, setSelectedIssue] = useState(null);
    const { issueId } = useParams();

    useEffect(() => onPageSelected('issues'), []);
    useEffect(() => {
      if(issues.length === 0 && collapseID === 0) {
        getIssues();
      } else if(collapseID === 0 && filteredIssue.length > 0) {
        if(issueId) {
            setCollapseID(issueId);    
        } else {
            setCollapseID(filteredIssue[0]._id);    
        }                
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

    const displayIssues = filteredIssue.map(issue => <IssueCard key={issue._id} toggleCollapse={toggleCollapse} issue={issue} openID={collapseID} onUpdateIssue={openAddUpdateModal}/>);    
    
    if(loader.loadingIssues) {
      return <Spinner />
    }

    return (
        <div className="issues-page">
            <MDBContainer>
                <MDBRow>
                  <MDBCol>
                    <IssueFilters />
                  </MDBCol>                 
                </MDBRow>   
                <MDBRow className="add-issue">
                  <MDBCol className={auth.user.isCommitteeMember ? "add-issue-hide" : "ml-auto"} md="6" lg="4">
                    <RoundedBtn color="primary" onClick={() => openAddUpdateModal(null)} icon="user-plus" caption="Create New Issue"/>
                  </MDBCol>                  
                </MDBRow>     
                <MDBRow className="issue-row">
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
    loader: PropTypes.object.isRequired,
    issues: PropTypes.array.isRequired,
    getIssues: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    filteredIssue: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    loader: state.loader,
    errors: state.errors,
    issues: state.issue,
    filteredIssue: selectIssues(state.issue, state.issueFilters)
});

export default connect(mapStateToProps, { getIssues })(IssuesPage);
