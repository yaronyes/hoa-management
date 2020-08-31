import React, { useState, useEffect } from 'react';
import {    
    MDBCol,
    MDBCollapse,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBView,
} from 'mdbreact';
import './IssueCard.css';
import CardHeader from '../card-header/CardHeader';
import { deleteIssue, addCommentForIssue, updateIssue } from '../../actions/issueActions';
import RoundedBtn from '../rounded-button/RoundedBtn';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';  
import config from '../../config/config.json';   
import CommentModel from '../../models/CommentModel';
import AddAndShowComment from '../comments/AddAndShowComment';

const IssueCard = ({ toggleCollapse, issue, openID, onUpdateIssue, deleteIssue, addCommentForIssue, auth, updateIssue }) => {
    const [img, setImg] = useState("issue.png");  
    
    useEffect(() => {
        if(issue.haveImage) {
            setImg(`${config.server_url}/issues/${issue._id}/image?${new Date().getTime()}`);
        }
    }, [issue]);

    const addComment = (text) => {
        if(text) {
            addCommentForIssue(new CommentModel({ text }), issue._id);            
        }
    };

    const closeIssue = () => {
        try{
            if(issue.status === 'open') {
                updateIssue({ status: "close" }, issue._id);              
            }            
        } catch (e) {
            console.log(e)
            alert(e.message)
        }      
    };

    const allowedToUpdateIssue = !auth.user.isCommitteeMember && issue.createdBy === auth.user._id;

    const cardHeader = allowedToUpdateIssue ? <CardHeader id={issue._id} toggleCollapse={toggleCollapse} headerText={issue.title} 
                                                            icon={issue.status === 'open' ? 'exclamation-circle' : 'check-circle'}
                                                            secondText={issue.status === 'open' ? 'Close Issue' : 'Issue Closed'}
                                                            iconColor={issue.status === 'open' ? 'red-text' : 'green-text'}
                                                            onMainIconClicked={closeIssue} />                                             
                                             : <CardHeader id={issue._id} toggleCollapse={toggleCollapse} headerText={issue.title} 
                                                            icon={issue.status === 'open' ? 'exclamation-circle' : 'check-circle'}
                                                            secondText={issue.status === 'open' ? 'Open Issue' : 'Issue Closed'}
                                                            iconColor={issue.status === 'open' ? 'red-text' : 'green-text'} />                                                                                                                                                                    
                                             //: <CardHeader id={issue._id} toggleCollapse={toggleCollapse} headerText={issue.title} icon='none'/> 
                                                    
            
    
    return (
        <div className="issue-card">
            <MDBCard style={{ backgroundColor: 'transparent' }}>                
                {cardHeader}
                <MDBCollapse id={issue._id} isOpen={openID === issue._id ? true :  false}>
                <MDBCardBody>
                    <MDBRow className='my-3'>
                        <MDBCol md="6">
                            <MDBRow>
                                <MDBCol md='4' className='img-col'>
                                    {/* <MDBView className='z-depth-1'> */}
                                        <MDBCardImage
                                        className='img-fluid z-depth-1'
                                        src={img}
                                        alt=''                                
                                    />
                                    {/* </MDBView> */}
                                </MDBCol>
                                <MDBCol /*md='3'*/ className="data-col">                           
                                    <p><span className="l-title">Details: </span>{issue.details}</p>
                                    <p><span className="l-title">Priority: </span>{issue.priority}</p>
                                    <p><span className="l-title">Status: </span>{issue.status}</p>    
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                        {/* { issue.comments.length > 0 */}
                         <MDBCol md="6">
                            <MDBRow className="h-100">
                                {/* { issue.status === 'open' */}
                                 <MDBCol className="main-comments-col">
                                    <AddAndShowComment addComment={addComment} showAddComment={auth.user.isCommitteeMember && issue.status === 'open'} comments={issue.comments} />                            
                                </MDBCol>
                                {/* : null}                                */}
                            </MDBRow>
                        </MDBCol>
                        {/* : null}                                               */}
                    </MDBRow>
                    <MDBRow>                        
                        { !auth.user.isCommitteeMember && issue.createdBy === auth.user._id
                        ? <MDBCol className="btn-col">                                                                
                            <div className="ml-auto">
                                { issue.status === 'open'
                                    
                                ?<RoundedBtn color="info" onClick={() => onUpdateIssue(issue)}
                                    icon="pen" caption="Update" size="sm"/>                                         
                                : null}
                                    <RoundedBtn color="danger" onClick={() => deleteIssue(issue)} icon="trash" caption="Delete" size="sm"/>                                        
                            </div>
                        </MDBCol>
                        : null}                            
                    </MDBRow>
                </MDBCardBody>
                </MDBCollapse>
            </MDBCard>            
        </div>
    );

};


IssueCard.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    issues: PropTypes.array.isRequired,
    deleteIssue: PropTypes.func.isRequired,
    addCommentForIssue: PropTypes.func.isRequired,
    updateIssue: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    issues: state.issue
});

export default connect(mapStateToProps, { deleteIssue, addCommentForIssue, updateIssue })(IssueCard);