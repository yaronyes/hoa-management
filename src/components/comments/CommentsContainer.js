import React, { useState, useEffect, useRef } from 'react';
import CommentPanel from './CommentPanel';
//import { css } from 'glamor';
import ScrollToBottom from 'react-scroll-to-bottom';
import './CommentsContainer.css';

const CommentsContainer = ({ comments }) => {

    const displayComments = comments.map(comment => <CommentPanel key={comment._id} text={comment.text}/>)

    // const ROOT_CSS = css({
    //     height: '100%',
    //     width: '100%'
    // });
    
    const style = { 
        width: '100%', 
        height: comments.length === 0 ? 0 : 100 
    }

    return (       
        <div style={style}>
            <ScrollToBottom /*className={ ROOT_CSS }*/ className="scroll-to-bottom">
                {displayComments}                 
            </ScrollToBottom>
        </div>
    );
};

export default CommentsContainer;