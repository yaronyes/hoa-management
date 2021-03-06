import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdbreact';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';     
import { getMessages } from '../../actions/messageActions';
import MessageCard from '../../components/messages/MessageCard';
import AddUpdateMessage from '../../components/messages/AddUpdateMessage';
import './MessagesPage.css';
import MessageFilters from '../../components/messages/MessageFilters';
import selectMessages from '../../selectors/messageSelector';
import Spinner from '../../components/spinner/Spinner';
import { useParams } from 'react-router-dom';
import { Badge } from '@material-ui/core';
import AccordionNav from '../../components/navbar/AccordionNav';
import { updateSortDirection } from '../../actions/messageFilters';

const MessagesPage = ({ loader, getMessages, filters, updateSortDirection, messages, auth, filteredMessages, onPageSelected }) => {
    const [collapseID, setCollapseID] = useState(0);        
    const [modal, setModel] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);    
    const { messageId } = useParams();
    useEffect(() => {
        onPageSelected('messages');

        return () => updateSortDirection("asc");
    }, []);

    useEffect(() => {
        if(messages.length === 0) {
            getMessages();
        } else if(filteredMessages.length > 0) {
           if(messageId) {
                setCollapseID(messageId);
           } else if (collapseID === 0) {
                setCollapseID(filteredMessages[0]._id);
           }          
           
        }     
      }, [messages, messageId]);
     
    const toggle = () => {
      setModel(!modal);
    }
    
    const openAddUpdateModal = message => {
      setSelectedMessage(message);      
      toggle();
    }
    
    const toggleCollapse = newCollapseID => setCollapseID(collapseID !== newCollapseID ? newCollapseID : '');
    
    const displayMessages = filteredMessages.map(message => !auth.user.cardMode
                                                    ? <MessageCard key={message._id} toggleCollapse={toggleCollapse} message={message} openID={collapseID} onUpdateMessage={openAddUpdateModal}/>    
                                                    :  <MDBCol key={message._id} lg="4" md="6" className="mt-4">
                                                        <MessageCard toggleCollapse={toggleCollapse} message={message} openID={collapseID} onUpdateMessage={openAddUpdateModal} cardMode={true} />
                                                      </MDBCol>);    

    const toDisplay = displayMessages.length > 0 ? displayMessages : <h3 className="h3-responsive mb-2 font-weight-bold">No messages to show</h3>;

    const sortingNav = <AccordionNav showPlusIcon={auth.user.isCommitteeMember} plusClicked={() => openAddUpdateModal(null)}            
    showSortingDirectionIcon={filters.sortBy === 'createdAt'} sortingDirectionClicked={(isUp) => updateSortDirection(isUp ? "asc" : "desc")} floatingMode={auth.user.cardMode}/>

    if(loader.loadingMessages) {
      return <Spinner fullPage={true} />
    }

    return (
        <div className="message-page">
        <MDBContainer>
            <MDBRow> 
              <MDBCol>
                <MessageFilters />
              </MDBCol>                           
            </MDBRow>   
            <MDBRow>
              { !auth.user.isCommitteeMember
                ? <MDBCol className="add-message mr-auto" md="6" lg="4">
                    <h5><strong>You have 
                    <Badge badgeContent={messages.filter(message => !message.seenBy.includes(auth.user._id)).length} color="secondary" className="unread-messages-count">
                        <MDBIcon icon="envelope" size="1x" className="mr-1" />                        
                    </Badge>
                    unread messages</strong></h5>
                  </MDBCol>
                : null
              }
            </MDBRow> 
            { auth.user.cardMode    
            ? sortingNav
            : null }
            <MDBRow>
               {!auth.user.cardMode  
              ? <MDBContainer className='accordion md-accordion accordion-1'>
                   {sortingNav}
                    {toDisplay}
              </MDBContainer> 
             : toDisplay }
            </MDBRow>             
        </MDBContainer>
        <AddUpdateMessage modal={modal} toggle={toggle} messageToUpdate={selectedMessage}/>                       
    </div>
    );
}

MessagesPage.propTypes = {
  auth: PropTypes.object.isRequired,
  loader: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  messages: PropTypes.array.isRequired,
  getMessages: PropTypes.func.isRequired,
  filteredMessages: PropTypes.array.isRequired,
  filters: PropTypes.object.isRequired,
  updateSortDirection: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,   
  loader: state.loader,
  errors: state.errors,
  messages: state.message,
  filters: state.messageFilters,
  filteredMessages: selectMessages(state.message, state.messageFilters)
});

export default connect(mapStateToProps, { getMessages, updateSortDirection })(MessagesPage);
