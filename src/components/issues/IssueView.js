import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import selectIssues from '../../selectors/issueSelector';
import { MDBRow, MDBCol } from 'mdbreact';
import IssueCard from './IssueCard';
import { getIssues } from '../../actions/issueActions';

const IssueView = ({ issues, getIssues, newReportedIssues, overdueIssues, isNewIssues }) => {
    const [collapseID, setCollapseID] = useState(0);
    const [filter, setFilter] = useState([]);

    useEffect(() => {        
        if(filter.length !== 0 && collapseID === 0) {
            setCollapseID(filter[0]._id);
        }        
    }, [filter]);

    useEffect(() => {
        if(issues.length === 0) {
          getIssues();
        } else {            
            setFilter(isNewIssues ? newReportedIssues : overdueIssues);            
        }     
    }, [issues]);
    
    const toggleCollapse = newCollapseID => setCollapseID(collapseID !== newCollapseID ? newCollapseID : '');

    const displayIssues =  filter.map(issue => <IssueCard key={issue._id} toggleCollapse={toggleCollapse} issue={issue} openID={collapseID} />);    
    
    return (
        <div className="issue-view">
            <MDBRow className="issue-view-header">
                <MDBCol style={{ textAlign: "left" }}>
                    {isNewIssues ? <h2>New Reported Issues</h2> : <h2>Overdue Issues</h2>}
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
