import React, { useState } from 'react';
import {    
    MDBCol,
    MDBCollapse,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBView,
    MDBInput
} from 'mdbreact';
import './IssueCard.css';
import CardHeader from '../card-header/CardHeader';
import { deleteIssue, addCommentForIssue } from '../../actions/issueActions';
import RoundedBtn from '../rounded-button/RoundedBtn';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';  
import config from '../../config/config.json';   
import CommentPanel from '../comments/CommentPanel';
import CommentModel from '../../models/CommentModel';

const IssueCard = ({ toggleCollapse, issue, openID, onUpdateIssue, deleteIssue, addCommentForIssue, auth }) => {
    const [comment, setComment] = useState("");
    const img = `${config.server_url}/issues/${issue._id}/image?${new Date().getTime()}`;
    //const [modal, setModel] = useState(false);

    // const toggle = () => {
    //     setModel(!modal);
    // }   
    // const addComment = (event) => {
    //     if(event.keyCode === 13 && (comment && comment.trim() !== "")) {
    //         addCommentForIssue(new CommentModel({ text: comment }), issue._id);
    //         setComment("");            
    //     }        
    // }
    
    const addComment = () => {
        if(comment) {
            addCommentForIssue(new CommentModel({ text: comment }), issue._id);
            setComment("");
        }
    }

    const displayComments = issue.comments.map(comment => <CommentPanel key={comment._id} text={comment.text}/>)

    return (
        <div className="issue-card">
            <MDBCard style={{ backgroundColor: 'transparent' }}>                
                <CardHeader id={issue._id} toggleCollapse={toggleCollapse} headerText={issue.title} icon='none'/>
                <MDBCollapse id={issue._id} isOpen={openID === issue._id ? true :  false}>
                <MDBCardBody>
                    <MDBRow className='my-3'>
                        <MDBCol md='2' className='img-col'>
                            <MDBView className='z-depth-1'>
                            <MDBCardImage
                                className='img-fluid z-depth-1'
                                src={img}
                                alt=''                                
                            />
                            </MDBView>
                        </MDBCol>
                        <MDBCol md='3' className="data-col">
                            {/* <h2 className='font-weight-bold mb-3 black-text'>
                            Hi! I am the first one.
                            </h2> */}
                            <MDBRow>
                                <MDBCol className="text-col">
                                    <p><span className="l-title">Details: </span>{issue.details}</p>
                                    <p><span className="l-title">Priority: </span>{issue.priority}</p>
                                    <p><span className="l-title">Status: </span>{issue.status}</p>    
                                    {/* comments */}
                                </MDBCol>                             
                            </MDBRow>
                            {/* <MDBRow>
                                <MDBCol  md="6" className="offset-md-6">
                                    <div className="btn-group-issue">                                              
                                        <RoundedBtn color="info" onClick={() => onUpdateIssue(issue)} icon="user-edit" caption="Update"/>
                                        <RoundedBtn color="danger" onClick={() => onUpdateIssue(issue)} icon="trash" caption="Delete"/>
                                    </div>    
                                </MDBCol>
                            </MDBRow> */}
                        </MDBCol>
                        <MDBCol md='4' className="main-comments-col">
                            <MDBRow>
                                <MDBCol className="comments-col">
                                    {/* <CommentPanel text="this is my comment this is my comment"/> */}
                                    {displayComments}
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol>
                                    <MDBInput
                                    type="textarea"
                                    label="Add Comment"
                                    rows="2"
                                    icon="pencil-alt"
                                    value={comment}
                                    onChange={e => setComment(e.target.value)}
                                    // onKeyUp={addComment}                                    
                                    />               
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                        <MDBCol md='3' className="btn-col">
                            <MDBRow className="btn-row">
                                <MDBCol>
                                    <div className="btn-group-issue">                                              
                                        <RoundedBtn color="info" onClick={!auth.user.isCommitteeMember ? () => onUpdateIssue(issue) : addComment}
                                         icon="pen" caption={!auth.user.isCommitteeMember ? "Update" : "Comment"} size="sm"/>
                                        { !auth.user.isCommitteeMember
                                        ? <RoundedBtn color="danger" onClick={() => deleteIssue(issue)} icon="trash" caption="Delete" size="sm"/>
                                        : null}
                                    </div>    
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                </MDBCardBody>
                </MDBCollapse>
            </MDBCard>
            {/* <AddUpdateTenant modal={modal} toggle={toggle} selectedTenant={tenant}/> */}
        </div>
    );

};


IssueCard.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    issues: PropTypes.array.isRequired,
    deleteIssue: PropTypes.func.isRequired,
    addCommentForIssue: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    issues: state.issue
});

export default connect(mapStateToProps, { deleteIssue, addCommentForIssue })(IssueCard);