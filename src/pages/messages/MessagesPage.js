import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdbreact';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';     
import { getMessages } from '../../actions/messageActions';
import RoundedBtn from '../../components/rounded-button/RoundedBtn';
import MessageCard from '../../components/messages/MessageCard';
import AddUpdateMessage from '../../components/messages/AddUpdateMessage';
import './MessagesPage.css';
import MessageFilters from '../../components/messages/MessageFilters';
import selectMessages from '../../selectors/messageSelector';
import Spinner from '../../components/spinner/Spinner';
import { useParams } from 'react-router-dom';
import { Badge } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
// import MailIcon from '@material-ui/icons/Mail';

// const useStyles = makeStyles((theme) => ({
//     root: {
//       '& > *': {
//         margin: theme.spacing(1),
//       },
//     },
//   }));

const MessagesPage = ({ loader, getMessages, messages, auth, filteredMessages, onPageSelected }) => {
    const [collapseID, setCollapseID] = useState(0);        
    const [modal, setModel] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const { messageId } = useParams();
    // const classes = useStyles();

    useEffect(() => onPageSelected('messages'), []);

    useEffect(() => {
        if(messages.length === 0) {
            getMessages();
        } else if(/*collapseID === 0 && */filteredMessages.length > 0) {
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
   
    const displayMessages = filteredMessages.map(message => <MessageCard key={message._id} toggleCollapse={toggleCollapse} message={message} openID={collapseID} onUpdateMessage={openAddUpdateModal}/>);    

    if(loader.loadingMessages) {
      return <Spinner />
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
              { auth.user.isCommitteeMember
                ? <MDBCol className="add-message ml-auto" md="6" lg="4">
                <RoundedBtn color="primary" onClick={() => openAddUpdateModal(null)} icon="user-plus" caption="Create New message"/>
                </MDBCol>
                : <MDBCol className="add-message mr-auto" md="6" lg="4">
                    {/* <h5><strong>You have <p className="unread-messages cyan-text">{messages.filter(message => !message.seenBy.includes(auth.user._id)).length}</p> unread messages</strong></h5>                   */}
                    {/* <div className={classes.root}> */}
                    <h5><strong>You have 
                    <Badge badgeContent={messages.filter(message => !message.seenBy.includes(auth.user._id)).length} color="secondary" className="unread-messages-count">
                        <MDBIcon icon="envelope" size="1x" className="mr-1" />                        
                    </Badge>
                    unread messages</strong></h5>
                    {/* </div> */}
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

export default connect(mapStateToProps, { getMessages })(MessagesPage);
