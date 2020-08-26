import React, { useState, useEffect, useRef } from 'react';
import CommentPanel from './CommentPanel';
import { Scrollbars } from 'react-custom-scrollbars';
import './CommentsContainer.css'

const CommentsContainer = ({ comments }) => {

    const commentsEndRef = useRef(null);
    
    useEffect(() => {
        commentsEndRef.current.scrollIntoView({ behavior: "smooth" });
      }, [comments]);

    const displayComments = comments.map(comment => <CommentPanel key={comment._id} text={comment.text}/>)

    return (
        // <div className="commentsWrapper" style={{ width: '100%' }}>
        //     {displayComments}
        //     <div ref={commentsEndRef} />
        // </div>
        <div style={{ width: '100%', height: comments.length === 0 ? 0 : 150 }}>
            <Scrollbars style={{ width: '100%', height: '100%' }}>
                {displayComments} 
                <div ref={commentsEndRef} />               
            </Scrollbars>
        </div>
    );
};

export default CommentsContainer;