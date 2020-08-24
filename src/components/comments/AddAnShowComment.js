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
import RoundedBtn from '../rounded-button/RoundedBtn';
import CommentPanel from './CommentPanel';
import './AddAnShowComment.css';

const AddAnShowComment = ({ addComment, comments, showAddComment }) => {
    const [comment, setComment] = useState("");

    const addCommentClicked = () => {
        if(comment) {
            addComment(comment);
            setComment("");
        }
    }

    const displayComments = comments.map(comment => <CommentPanel key={comment._id} text={comment.text}/>)

    return (
        <div className="add-comment">
            <MDBRow>
                <MDBCol className="comments-col">
                    {displayComments}    
                </MDBCol>
            </MDBRow>
            { showAddComment
              ?  <MDBRow>
                <MDBCol className="add-comment-col">
                    <MDBInput
                    type="textarea"
                    label="Add Comment"
                    rows="2"
                    icon="pencil-alt"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    />
                        <RoundedBtn color="info" onClick={addCommentClicked}
                            icon="pen" caption="Comment" size="sm"/>
                </MDBCol>
            </MDBRow>
            : null}
        </div>
    );
};

export default AddAnShowComment;