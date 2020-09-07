import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';     
import { getIssues } from '../../actions/issueActions';
import IssueCard from '../../components/issues/IssueCard';
import AddUpdateIssue from '../../components/issues/AddUpdateIssue';
import './IssuesPage.css';
import selectIssues from '../../selectors/issueSelector';
import IssueFilters from '../../components/issues/IssueFilters';
import Spinner from '../../components/spinner/Spinner';
import { useParams } from 'react-router-dom';
import { updateSortDirection } from '../../actions/issueFilters';
import AccordionNav from '../../components/navbar/AccordionNav';

const IssuesPage = ({ loader, getIssues, issues, auth, filters, updateSortDirection, filteredIssue, onPageSelected }) => {
    const [collapseID, setCollapseID] = useState(0);    
    const [modal, setModel] = useState(false);
    const [selectedIssue, setSelectedIssue] = useState(null);
    const { issueId } = useParams();

    useEffect(() => {
        onPageSelected('issues');

        return () => updateSortDirection("asc");
    }, []);
    useEffect(() => {
      if(issues.length === 0) {
        getIssues();
      } else if(filteredIssue.length > 0) {
        if(issueId) {
            setCollapseID(issueId);    
        } else if(collapseID === 0) {
            setCollapseID(filteredIssue[0]._id);    
        }                
      }     
    }, [issues, issueId]);
   
    const toggle = () => {
      setModel(!modal);
    }

    const openAddUpdateModal = (issue) => {
      setSelectedIssue(issue);      
      toggle();
    }
    
    const toggleCollapse = newCollapseID => setCollapseID(collapseID !== newCollapseID ? newCollapseID : '');
    
    const displayIssues = filteredIssue.map(issue => !auth.user.cardMode
    ? <IssueCard key={issue._id} toggleCollapse={toggleCollapse} issue={issue} openID={collapseID} onUpdateIssue={openAddUpdateModal}/>
    : <MDBCol lg="4" md="6" className="mt-4">
        <IssueCard key={issue._id} toggleCollapse={toggleCollapse} issue={issue} openID={collapseID} onUpdateIssue={openAddUpdateModal} cardMode={true} />
      </MDBCol>);     
      
    const toDisplay = displayIssues.length > 0 ? displayIssues : <h3 className="h3-responsive mb-2 font-weight-bold">No issues to show</h3>;
    
    if(loader.loadingIssues) {
      return <Spinner fullPage={true} />
    }

    return (
        <div className="issues-page">
            <MDBContainer>
                <MDBRow>
                  <MDBCol>
                    <IssueFilters />
                  </MDBCol>                 
                </MDBRow>   
                { auth.user.cardMode    
                ? <AccordionNav showPlusIcon={!auth.user.isCommitteeMember} plusClicked={() => openAddUpdateModal(null)}
                showSortingDirectionIcon={filters.sortBy === 'createdAt'} sortingDirectionClicked={(isUp) => updateSortDirection(isUp ? "asc" : "desc")}/>
                : null } 
                <MDBRow className="issue-row">
                { !auth.user.cardMode  
                   ?<MDBContainer className='accordion md-accordion accordion-1'>
                        <AccordionNav showPlusIcon={!auth.user.isCommitteeMember} plusClicked={() => openAddUpdateModal(null)}
                        showSortingDirectionIcon={filters.sortBy === 'createdAt'} sortingDirectionClicked={(isUp) => updateSortDirection(isUp ? "asc" : "desc")}/>
                    {toDisplay}
                  </MDBContainer>
                  : toDisplay}
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
    filteredIssue: PropTypes.array.isRequired,
    filters: PropTypes.object.isRequired,
    updateSortDirection: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    loader: state.loader,
    errors: state.errors,
    issues: state.issue,
    filters: state.messageFilters,
    filteredIssue: selectIssues(state.issue, state.issueFilters)
});

export default connect(mapStateToProps, { getIssues, updateSortDirection })(IssuesPage);
