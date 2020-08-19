import React from 'react';
import FilterBox from '../../components/filter/FilterBox';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';     
import { getIssues } from '../../actions/issueActions';
import RoundedBtn from '../../components/rounded-button/RoundedBtn';
import IssueCard from '../../components/issues/IssueCard';
import AddUpdateMessage from '../../components/messages/AddUpdateMessage';

const MessagesPage = () => {
    return (
        <div>
            <MDBContainer>
            MessagesPage          
            </MDBContainer>           
        </div>
    );
}


export default MessagesPage;