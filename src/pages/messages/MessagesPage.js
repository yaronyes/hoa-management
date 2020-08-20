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
import DropDownSelect from '../../components/select/DropDownSelect';
import RadioButtonsGroup from '../../components/radio-buttons/RadioButtonsGroup';

const MessagesPage = ({ getMessages, messages, auth }) => {
    const [collapseID, setCollapseID] = useState(0);    
    const [filterText, setFilter] = useState("");
    const [modal, setModel] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState();
    const [priority, setPriority] = useState("");
    const [sortBy, setSortBy] = useState("createdAt");

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

    const compare = (a, b) => {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      
      return 0;
    }

    const filter = messages.filter(item => (item.title.toLowerCase().includes(filterText.toLowerCase().trim())) && (priority ? (item.priority === priority) : true));    
    filter.sort((a, b) => compare(a[sortBy], b[sortBy]));
    const displayMessages = filter.map(item => <MessageCard key={item._id} toggleCollapse={toggleCollapse} message={item} openID={collapseID} onUpdateMessage={openAddUpdateModal}/>);

    return (
        <div className="message-page">
        <MDBContainer>
            <MDBRow>
              <MDBCol className="filter-message" md="5">
                <FilterBox onFilterChanged={(text) => setFilter(text)} />
              </MDBCol>                 
              <MDBCol md="3">
              <DropDownSelect onChange={(priority) => setPriority(priority)} icon="exclamation" label="Filter by Priority"
                            dropDownItems={[
                                {
                                    value: "important",
                                    name: "important"
                                },
                                {
                                    value: "info",
                                    name: "info"
                                }
                            ]}/>  
              </MDBCol>
              <MDBCol md="4">
                  <RadioButtonsGroup 
                  label="Sort by:" radioBtnInfo={[
                    {
                      value: "createdAt",
                      label: "Date"
                    },
                    {
                      value: "priority",
                      label: "Priority"
                    }
                  ]} 
                  defaultSelect={sortBy}
                  onChange={(selected) => setSortBy(selected)}
                  />                 
              </MDBCol>
            </MDBRow>   
            <MDBRow>
              { auth.user.isCommitteeMember
                ? <MDBCol className="add-message ml-auto" md="6" lg="4">
                <RoundedBtn color="primary" onClick={() => openAddUpdateModal(undefined)} icon="user-plus" caption="Create New message"/>
                </MDBCol>
                : <MDBCol className="add-message mr-auto" md="6" lg="4">
                  You have unread messages
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
  getMessages: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,   
  errors: state.errors,
  messages: state.message
});

export default connect(mapStateToProps, { getMessages })(MessagesPage);
