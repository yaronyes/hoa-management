import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import selectMessages from '../../selectors/messageSelector';
import { MDBRow, MDBCol } from 'mdbreact';
import MessageCard from './MessageCard';
import { getMessages } from '../../actions/messageActions';
import './MessageView.css';

const MessageView = ({ auth, messages, getMessages, filteredMessages }) => {
    const [collapseID, setCollapseID] = useState(0);  
    
    useEffect(() => {
        if(messages.length === 0) {
            getMessages();
        } else if(collapseID === 0) {            
            setCollapseID(filteredMessages.filter(message => !message.seenBy.includes(auth.user._id))[0]._id);
        }     
    }, [messages]);

    const toggleCollapse = newCollapseID => setCollapseID(collapseID !== newCollapseID ? newCollapseID : '');

    const filter = filteredMessages.filter(message => !message.seenBy.includes(auth.user._id));
    const displayMessages =  filter.map(message => <MessageCard key={message._id} toggleCollapse={toggleCollapse} message={message} openID={collapseID} viewOnlyMode={true} />);    
    
    return (
        <div className="message-view">
            <MDBRow className="message-view-header">
                <MDBCol style={{ textAlign: "left" }}>
                    <h2>New Messages</h2>
                </MDBCol>                            
            </MDBRow>
            <MDBRow className="message-row">                            
                <MDBCol>                        
                    {displayMessages}
                </MDBCol>                            
            </MDBRow>      
        </div>
    );
};


MessageView.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequired,
    getMessages: PropTypes.func.isRequired,
    filteredMessages: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,   
    errors: state.errors,
    messages: state.message,
    filteredMessages: selectMessages(state.message, state.messageFilters)
});

export default connect(mapStateToProps, { getMessages })(MessageView);
