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
import CommentPanel from '../comments/CommentPanel';
import './AddComment.css';

const AddComment = ({ addComment, comments }) => {
    const [comment, setComment] = useState("");

    const displayComments = comments.map(comment => <CommentPanel key={comment._id} text={comment.text}/>)

    return (
        <div className="add-comment">
            <MDBRow>
                <MDBCol className="comments-col">
                    {displayComments}    
                </MDBCol>
            </MDBRow>
            <MDBRow>
                <MDBCol className="add-comment-col">
                    <MDBInput
                    type="textarea"
                    label="Add Comment"
                    rows="2"
                    icon="pencil-alt"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    />
                        <RoundedBtn color="info" onClick={addComment}
                            icon="pen" caption="Comment" size="sm"/>
                </MDBCol>
            </MDBRow>
        </div>
    );
};

export default AddComment;