import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import selectMessages from '../../selectors/messageSelector';
import { MDBRow, MDBCol } from 'mdbreact';
import MessageCard from './MessageCard';
import { getMessages } from '../../actions/messageActions';
import './MessageView.css';
import Spinner from '../spinner/Spinner';

const MessageView = ({ loader, auth, messages, getMessages, filteredMessages }) => {
    const [collapseID, setCollapseID] = useState(0);  
    const [filter, setFilter] = useState([]);
    
    useEffect(() => {        
        if(filter.length > 0 && collapseID === 0) {
            setCollapseID(filter[0]._id);
        }        
    }, [filter]);
    
    useEffect(() => {
        if(messages.length === 0) {
            getMessages();
        } else {            
            setFilter(filteredMessages.filter(message => !message.seenBy.includes(auth.user._id)));              
        }     
    }, [messages]);

    const toggleCollapse = newCollapseID => setCollapseID(collapseID !== newCollapseID ? newCollapseID : '');
    
    const displayMessages =  filter.map(message => <MessageCard key={message._id} toggleCollapse={toggleCollapse} message={message} openID={collapseID} viewOnlyMode={true} />);    
    
    return (
        <div className="message-view">
            { loader.loadingMessages
           ? <Spinner />
           : <MDBRow className="message-row">                            
                <MDBCol>                        
                    {displayMessages}
                </MDBCol>                            
            </MDBRow>  }
        </div>
    );
};

MessageView.propTypes = {
    auth: PropTypes.object.isRequired,
    loader: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequired,
    getMessages: PropTypes.func.isRequired,
    filteredMessages: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    loader: state.loader,   
    errors: state.errors,
    messages: state.message,
    filteredMessages: selectMessages(state.message, state.messageFilters)
});

export default connect(mapStateToProps, { getMessages })(MessageView);
