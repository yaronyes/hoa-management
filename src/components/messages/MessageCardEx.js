import React, { useState } from 'react';
import { MDBCard, MDBCardBody, MDBCardImage, MDBIcon, MDBCollapse } from 'mdbreact';
import './MessageCardEx.css'
import AddAndShowComment from '../comments/AddAndShowComment';
import FloatingBtn from '../buttons/FloatingBtn';
import { Badge } from '@material-ui/core';

const MessageCardEx = ({ message, onImageDBClicked, onUpdateMessage, deleteMessage, addComment, isCommitteeMember, introIcon, onIntroIconClicked }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const clicked = event => {        
        if(event.target.className.includes("intro-icon") && onIntroIconClicked) {
            event.stopPropagation();
            onIntroIconClicked(message._id);
        } 
    }

    return (
        <MDBCard>
            <MDBCardImage
                className='blue-gradient white-text d-flex justify-content-center align-items-center flex-column p-3 card-t'
                cascade
                tag='div'
            >
                <MDBIcon className={"priority-icon " + (message.priority === "info" ? 'blue-text' : 'red-text')} icon={message.priority === "info" ? 'info-circle' : 'exclamation-circle'} size="2x" />
                <h3 className='h3-responsive'>{message.title}</h3>
                <p>{new Date(message.createdAt).toLocaleString('he-IL')}</p>
                { isCommitteeMember
                ?<div className='text-center'>
                    <FloatingBtn color='blue' icon="edit" onBtnClicked={() => onUpdateMessage(message)}/>                
                    <FloatingBtn color='blue' icon='trash-alt' onBtnClicked={() => deleteMessage(message)}/>
                </div>
                : null }
                { introIcon !== "none"
                  ? <MDBIcon icon={introIcon} className="intro-icon" onClick={clicked}/>
                  : null}                  
            </MDBCardImage>            
            <MDBCardBody>            
                <h6><strong>Details: </strong><strong className="text-muted">{message.details}</strong></h6>                    
                <h6><strong>Priority: </strong><strong className="text-muted">{message.priority}</strong></h6>  
                <div className={'d-flex ' + (message.haveImage ? 'justify-content-between' : 'justify-content-end')}>
                { message.haveImage
                    ? <FloatingBtn color='blue' icon='image' onBtnClicked={onImageDBClicked}/>
                    : null }
                    <div style={{ position: "relative" }}>                
                        <FloatingBtn color='blue' icon='comment' onBtnClicked={() => setIsOpen(!isOpen)} className="ml-auto" />
                        <Badge badgeContent={message.comments.length > 0 ? message.comments.length : '0'} color="secondary" style={{ position: "absolute", top: "10px", right: "15px" }} />                    
                </div>
                </div>
                <MDBCollapse id="commentCollapse" isOpen={isOpen}>
                    <div className={message.comments.length > 0 ? "mt-2" : ""}>
                        <AddAndShowComment addComment={addComment} showAddComment={!isCommitteeMember} comments={message.comments} /> 
                    </div>
                </MDBCollapse>
            </MDBCardBody>
        </MDBCard>
  );
};

export default MessageCardEx;