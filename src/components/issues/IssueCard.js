import React, { useState, useEffect } from 'react';
import {    
    MDBCol,
    MDBCollapse,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow
} from 'mdbreact';
import './IssueCard.css';
import CardHeader from '../card-header/CardHeader';
import { deleteIssue, addCommentForIssue, updateIssue } from '../../actions/issueActions';
import RoundedBtn from '../buttons/RoundedBtn';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';  
import CommentModel from '../../models/CommentModel';
import AddAndShowComment from '../comments/AddAndShowComment';
import ImageCard from '../image/ImageCard';
import issueImage from '../../assets/issue.png';
import IssueCardEx from './IssueCardEx';
import ConfirmDeleteModal from '../delete-modal/ConfirmDeleteModal';

// component for rendering issue card for accordion
// Props: 
// toggleCollapse -function - for toggle the card
// issue: object - IssueModel class.the issue that the card represents
// openID: string - indicate the card id to toggle. if the openID === issue._id, the card is open
// onUpdateIssue - function - callback function for updating issue in the parent
// viewOnly - boolean - indicate if the parent of tha card is viewing only component like the dashboard
// cardMode - boolean - indicate if to render the card shape component instead of the accordion
// redux connect props:
// deleteIssue, addCommentForIssue, updateIssue: redux functions for delete/update and add comments for an issue
// auth - redux object represent the logged-in user
const IssueCard = ({ toggleCollapse, issue, openID, onUpdateIssue, deleteIssue, addCommentForIssue, auth, updateIssue, viewOnly = false, cardMode = false }) => {
    const [img, setImg] = useState(issueImage); 
    const [modal, setModel] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    
    useEffect(() => {
        if(issue.haveImage) {
            setImg(issue.getImageUrl(true));
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

    const toggleConfirmModal = () => setConfirmModal(!confirmModal);

    const onDeleteIssue = () => {        
        toggleConfirmModal();
    }

    const allowedToUpdateIssue = !auth.user.isCommitteeMember && issue.createdBy._id === auth.user._id && !viewOnly;

    const cardHeader = allowedToUpdateIssue ? <CardHeader id={issue._id} toggleCollapse={toggleCollapse} headerText={issue.title} 
                                                            icon={issue.status === 'open' ? 'exclamation-circle' : 'check-circle'}
                                                            secondText={issue.status === 'open' ? 'Close Issue' : 'Issue Closed'}
                                                            iconColor={issue.status === 'open' ? 'red-text' : 'green-text'}
                                                            secondTextSmallSize={true}
                                                            onMainIconClicked={closeIssue} />                                             
                                             : <CardHeader id={issue._id} toggleCollapse={toggleCollapse} headerText={issue.title} 
                                                            icon={issue.status === 'open' ? 'exclamation-circle' : 'check-circle'}
                                                            secondText={issue.status === 'open' ? `Opened By: ${issue.createdBy.name}` : 'Issue Closed'}
                                                            secondTextSmallSize={true}
                                                            iconColor={issue.status === 'open' ? 'red-text' : 'green-text'} />                                                                                                                                                                    
    
    return (
        <div className="issue-card">
            { !cardMode
            ?<MDBCard style={{ backgroundColor: 'transparent' }}>                
                {cardHeader}
                <MDBCollapse id={issue._id} isOpen={openID === issue._id ? true :  false}>
                <MDBCardBody>
                    <MDBRow className='my-3'>
                        <MDBCol md="7" className="main-col">
                            <MDBRow className="img-data-row">
                                <MDBCol md='4' className='img-col' onDoubleClick={() => toggle()}>
                                        <MDBCardImage
                                        className='img-fluid z-depth-1'
                                        src={img}
                                        alt=''                                
                                    />
                                </MDBCol>
                                <MDBCol md='8' className="data-col">                                 
                                    <h6><strong>Details: </strong><strong className="text-muted">{issue.details}</strong></h6>
                                    <h6><strong>Priority: </strong><strong className="text-muted">{issue.priority}</strong></h6>  
                                    <h6><strong>Status: </strong><strong className="text-muted">{issue.status}</strong></h6>  
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                         <MDBCol md="5">
                            <MDBRow className="h-100">
                                 <MDBCol className="main-comments-col">
                                    <AddAndShowComment addComment={addComment} showAddComment={auth.user.isCommitteeMember && issue.status === 'open'} comments={issue.comments} />                            
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>                        
                        { allowedToUpdateIssue
                        ? <MDBCol className="btn-col">                                                                
                            <div className="ml-auto">
                                { issue.status === 'open'                                    
                                ?<RoundedBtn color="info" onClick={() => onUpdateIssue(issue)}
                                    icon="pen" caption="Update" size="sm"/>                                         
                                : null}
                                    <RoundedBtn color="danger" onClick={onDeleteIssue} icon="trash" caption="Delete" size="sm"/>                                        
                            </div>
                        </MDBCol>
                        : null}                            
                    </MDBRow>
                </MDBCardBody>
                </MDBCollapse>
            </MDBCard>
            : <IssueCardEx issue={issue} onImageDBClicked={toggle} onUpdateIssue={onUpdateIssue} deleteIssue={onDeleteIssue} addComment={addComment}
                        closeIssue={closeIssue} isCommitteeMember={auth.user.isCommitteeMember} allowedToUpdateIssue={allowedToUpdateIssue}/> }
            <ImageCard imageUrl={issue.getImageUrl(true)} modal={modal} toggle={toggle} />   
            <ConfirmDeleteModal toggle={toggleConfirmModal} modal={confirmModal} title={issue.title} onDeleteConfirm={() => deleteIssue(issue)}/>         
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