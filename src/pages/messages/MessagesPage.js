import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';     
import { getMessages } from '../../actions/messageActions';
import RoundedBtn from '../../components/rounded-button/RoundedBtn';
import MessageCard from '../../components/messages/MessageCard';
import AddUpdateMessage from '../../components/messages/AddUpdateMessage';
import './MessagesPage.css';
import MessageFilters from '../../components/messages/MessageFilters';
import selectMessages from '../../selectors/messageSelector';

const MessagesPage = ({ getMessages, messages, auth, filteredMessages }) => {
    const [collapseID, setCollapseID] = useState(0);        
    const [modal, setModel] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);

    useEffect(() => {
        if(messages.length === 0) {
            getMessages();
        } else if(collapseID === 0 && filteredMessages.length > 0) {
          setCollapseID(filteredMessages[0]._id);
        }     
      }, [messages]);
     
    const toggle = () => {
      setModel(!modal);
    }

    const openAddUpdateModal = message => {
      setSelectedMessage(message);      
      toggle();
    }
    
    const toggleCollapse = newCollapseID => setCollapseID(collapseID !== newCollapseID ? newCollapseID : '');
   
    const displayMessages = filteredMessages.map(message => <MessageCard key={message._id} toggleCollapse={toggleCollapse} message={message} openID={collapseID} onUpdateMessage={openAddUpdateModal}/>);    

    return (
        <div className="message-page">
        <MDBContainer>
            <MDBRow> 
              <MDBCol>
                <MessageFilters />
              </MDBCol>                           
            </MDBRow>   
            <MDBRow>
              { auth.user.isCommitteeMember
                ? <MDBCol className="add-message ml-auto" md="6" lg="4">
                <RoundedBtn color="primary" onClick={() => openAddUpdateModal(null)} icon="user-plus" caption="Create New message"/>
                </MDBCol>
                : <MDBCol className="add-message mr-auto" md="6" lg="4">
                  You have {messages.filter(message => !message.seenBy.includes(auth.user._id)).length} unread messages
                  </MDBCol>
              }
            </MDBRow>     
            <MDBRow>
              <MDBContainer className='accordion md-accordion accordion-1'>
                {displayMessages}                 
              </MDBContainer>
            </MDBRow>             
        </MDBContainer>
        <AddUpdateMessage modal={modal} toggle={toggle} messageToUpdate={selectedMessage}/>                       
    </div>
    );
}

MessagesPage.propTypes = {
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

export default connect(mapStateToProps, { getMessages })(MessagesPage);
