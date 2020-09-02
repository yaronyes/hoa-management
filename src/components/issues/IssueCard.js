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
import ImageCard from '../image/ImageCard';

const IssueCard = ({ toggleCollapse, issue, openID, onUpdateIssue, deleteIssue, addCommentForIssue, auth, updateIssue, viewOnly = false }) => {
    const [img, setImg] = useState("issue.png"); 
    const [modal, setModel] = useState(false);
    
    useEffect(() => {
        if(issue.haveImage) {
            //setImg(`${config.server_url}/issues/${issue._id}/image?${new Date().getTime()}`);
            setImg(issue.getImageUrl());
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

    const toggle = () => setModel(!modal);

    const allowedToUpdateIssue = !auth.user.isCommitteeMember && issue.createdBy._id === auth.user._id && !viewOnly;

    const cardHeader = allowedToUpdateIssue ? <CardHeader id={issue._id} toggleCollapse={toggleCollapse} headerText={issue.title} 
                                                            icon={issue.status === 'open' ? 'exclamation-circle' : 'check-circle'}
                                                            secondText={issue.status === 'open' ? 'Close Issue' : 'Issue Closed'}
                                                            iconColor={issue.status === 'open' ? 'red-text' : 'green-text'}
                                                            onMainIconClicked={closeIssue} />                                             
                                             : <CardHeader id={issue._id} toggleCollapse={toggleCollapse} headerText={issue.title} 
                                                            icon={issue.status === 'open' ? 'exclamation-circle' : 'check-circle'}
                                                            secondText={issue.status === 'open' ? `Open Issue (Opened by ${issue.createdBy.name})` : 'Issue Closed'}
                                                            iconColor={issue.status === 'open' ? 'red-text' : 'green-text'} />                                                                                                                                                                    
                                             //: <CardHeader id={issue._id} toggleCollapse={toggleCollapse} headerText={issue.title} icon='none'/>                                                     
    
    return (
        <div className="issue-card">
            <MDBCard style={{ backgroundColor: 'transparent' }}>                
                {cardHeader}
                <MDBCollapse id={issue._id} isOpen={openID === issue._id ? true :  false}>
                <MDBCardBody>
                    <MDBRow className='my-3'>
                        <MDBCol md="7">
                            <MDBRow className="img-data-row">
                                <MDBCol md='5' className='img-col' onDoubleClick={() => toggle()}>
                                    {/* <MDBView className='z-depth-1'> */}
                                        <MDBCardImage
                                        className='img-fluid z-depth-1'
                                        src={img}
                                        alt=''                                
                                    />
                                    {/* </MDBView> */}
                                </MDBCol>
                                <MDBCol /*md='3'*/ className="data-col">                           
                                    <h5><strong>Details: </strong><strong className="text-muted">{issue.details}</strong></h5>
                                    <h5><strong>Priority: </strong><strong className="text-muted">{issue.priority}</strong></h5>  
                                    <h5><strong>Status: </strong><strong className="text-muted">{issue.status}</strong></h5>  
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                        {/* { issue.comments.length > 0 */}
                         <MDBCol md="5">
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
                        { allowedToUpdateIssue
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
            <ImageCard imageUrl={issue.getImageUrl(true)} modal={modal} toggle={toggle} />            
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