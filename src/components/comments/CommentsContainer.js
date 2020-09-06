import React from 'react';
import CommentPanel from './CommentPanel';
import ScrollToBottom from 'react-scroll-to-bottom';
import './CommentsContainer.css';

const CommentsContainer = ({ comments }) => {

    const displayComments = comments.map(comment => <CommentPanel key={comment._id} text={comment.text} name={comment.createdBy.name}/>)
   
    const style = { 
        width: '100%', 
        height: comments.length === 0 ? 0 : 100 
    }

    return (       
        <div style={style}>
            <ScrollToBottom className="scroll-to-bottom " scrollViewClassName="scrollbar scrollbar-primary">
                {displayComments}                 
            </ScrollToBottom>
        </div>
    );
};

export default CommentsContainer;