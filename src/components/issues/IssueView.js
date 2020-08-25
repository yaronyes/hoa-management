import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import selectIssues from '../../selectors/issueSelector';
import { MDBRow, MDBCol } from 'mdbreact';
import IssueCard from './IssueCard';
import { getIssues } from '../../actions/issueActions';

const IssueView = ({ issues, getIssues, newReportedIssues, overdueIssues, isNewIssues }) => {
    const [collapseID, setCollapseID] = useState(0);    

    useEffect(() => {
        if(issues.length === 0) {
          getIssues();
        }      
      }, [issues]);

    const toggleCollapse = newCollapseID => setCollapseID(collapseID !== newCollapseID ? newCollapseID : '');

    const filter = isNewIssues ? newReportedIssues : overdueIssues;
    const displayIssues =  filter.map(issue => <IssueCard key={issue._id} toggleCollapse={toggleCollapse} issue={issue} openID={collapseID} />);    
    
    return (
        <div className="issue-view">
            <MDBRow className="issue-view-header">
                <MDBCol style={{ textAlign: "left" }}>
                    {isNewIssues ? <h1>New Reported Issues</h1> : <h1>Overdue Issues</h1>}
                </MDBCol>                            
            </MDBRow>
            <MDBRow className="issues-row">                            
                <MDBCol>                        
                    {displayIssues}
                </MDBCol>                            
            </MDBRow>      
        </div>
    );
};


IssueView.propTypes = {
    // auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    issues: PropTypes.array.isRequired,
    newReportedIssues: PropTypes.array.isRequired,
    overdueIssues: PropTypes.array.isRequired,
    getIssues: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    // auth: state.auth,
    errors: state.errors,
    issues: state.issue,
    newReportedIssues: selectIssues(state.issue, state.issueFilters, 'open'),
    overdueIssues: selectIssues(state.issue, state.issueFilters, 'close'),
});

export default connect(mapStateToProps, { getIssues })(IssueView);