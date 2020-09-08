import React, { useState } from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBIcon, MDBCollapse } from 'mdbreact';
import './MessageCardEx.css'
import AddAndShowComment from '../comments/AddAndShowComment';

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
                <h2 className='h2-responsive'>{message.title}</h2>
                <p>{message.createdAt}</p>
                { isCommitteeMember
                ?<div className='text-center'>                
                    <MDBBtn color='blue' size='sm' className="floating-btn-ex" onClick={() => onUpdateMessage(message)}>
                        <MDBIcon icon="edit" />
                    </MDBBtn>
                    <MDBBtn color='blue' size='sm' className="floating-btn-ex" onClick={() => deleteMessage(message)}>
                        <MDBIcon icon='trash-alt' size="lg"/>
                    </MDBBtn>                
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
                    ?<MDBBtn color='blue' size='sm' className="floating-btn-ex" onClick={onImageDBClicked}>
                        <MDBIcon icon="image" />
                    </MDBBtn>    
                    : null }
                    <MDBBtn color='blue' size='sm' className="floating-btn-ex ml-auto" onClick={() => setIsOpen(!isOpen)}>
                        <MDBIcon icon='comment' size="lg"/>
                    </MDBBtn>                
                </div>
                <MDBCollapse id="commentCollapse" isOpen={isOpen}>
                    <div className="mt-2">
                        <AddAndShowComment addComment={addComment} showAddComment={!isCommitteeMember} comments={message.comments} /> 
                    </div>
                </MDBCollapse>
            </MDBCardBody>
        </MDBCard>
  );
};

export default MessageCardEx;