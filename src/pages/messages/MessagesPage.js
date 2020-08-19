import React, { useState, useEffect } from 'react';
import FilterBox from '../../components/filter/FilterBox';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';     
import { getMessages } from '../../actions/messageActions';
import RoundedBtn from '../../components/rounded-button/RoundedBtn';
import MessageCard from '../../components/messages/MessageCard';
import AddUpdateMessage from '../../components/messages/AddUpdateMessage';
import './MessagesPage.css';

const MessagesPage = ({ getMessages, messages }) => {
    const [collapseID, setCollapseID] = useState(0);    
    const [filterText, setFilter] = useState("");
    const [modal, setModel] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState();

    useEffect(() => {
        if(messages.length === 0) {
            getMessages();
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
  
      const filter = messages.filter(item => item.title.toLowerCase().includes(filterText.toLowerCase().trim()));
      const displayMessages= filter.map(item => <MessageCard key={item._id} toggleCollapse={toggleCollapse} message={item} openID={collapseID} onUpdateMessage={openAddUpdateModal}/>);

    return (
        <div className="message-page">
        <MDBContainer>
            <MDBRow>
              <MDBCol className="filter-message">
                <FilterBox onFilterChanged={(text) => setFilter(text)} />
              </MDBCol>                  
            </MDBRow>   
            <MDBRow>
              <MDBCol className="add-message offset-md-9" md="3">
                <RoundedBtn color="primary" onClick={() => openAddUpdateModal(undefined)} icon="user-plus" caption="Create New message"/>
              </MDBCol>                  
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
    errors: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequired,
    getMessages: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors,
    messages: state.message
});

export default connect(mapStateToProps, { getMessages })(MessagesPage);
