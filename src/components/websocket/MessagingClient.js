import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';     
import { addIssue, editIssue, removeIssue, issueImageUpdated  } from '../../actions/issueActions';
import { addVoting, editVoting } from '../../actions/votingActions';
import { addMessage, editMessage, removeMessage, messageImageUpdated  } from '../../actions/messageActions';
import { setCurrentUser } from '../../actions/authActions';
import wsClient from '../../utils/WebSocketClient';
import IssueModel from '../../models/IssueModel';
import MessageModel from '../../models/MessageModel';
import VotingModel from '../../models/VotingModel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom";

const MessagingClient = ({ auth, issueAdded, issueUpdated, issueDeleted, issueImageUpd,
    messageAdded, messageUpdated, messageDeleted, messageImageUpd, votingAdded, votingUpdated, tenantDeleted }) => {
    const [connected, setConnected] = useState(false);
    const history = useHistory();
    
    useEffect(() => {
        if(connected) {
            wsClient.setOnRefreshCallback(data => {                
                if(data.userId !== auth.user._id) {
                    switch(data.model) {
                        case 'messages':
                            handleMessages(data);
                            break;
                        case 'tenants':                            
                            handleTenants(data);
                            break;
                        case 'voting':
                            handleVoting(data);
                            break;  
                        case 'issues':
                            handleIssues(data);
                            break;                                            
                        default:
                            break;
                    }    
                }                
            });
        }
    }, [connected]);

    useEffect(() => {        
        if(auth.isAuthenticated) {
            wsClient.setOnConnectCallback(() => setConnected(true));
            wsClient.connect();
        }
    }, [auth]);

    useEffect(() => {
        return () => {
            if(wsClient.connected) {
                wsClient.close();
            }
        }        
    }, []);

    const handleMessages = data => {
        switch(data.actionType) {
            case 'MESSAGE_ADDED':                
                messageAdded(new MessageModel(data.actionData));                
                notify("New message was added", `/messages/${data.actionData._id}`);
                break;
            case 'MESSAGE_UPDATED':                
                messageUpdated(new MessageModel(data.actionData));                
                notify("Message was updated", `/messages/${data.actionData._id}`);
                break;                
            case 'MESSAGE_DELETED':
                messageDeleted(data.actionData);
                break;         
            case 'IMAGE_UPDATED':
                messageImageUpd(data.actionData.id);
                notify("Message was updated", `/messages/${data.actionData.id}`);
                break;
            default:
                break;
        }        
    }

    const handleIssues = data => {
        switch(data.actionType) {
            case 'ISSUE_ADDED':
                issueAdded(new IssueModel(data.actionData));
                notify("New issue was added", `/issues/${data.actionData._id}`);
                break;
            case 'ISSUE_UPDATED':                
                issueUpdated(new IssueModel(data.actionData));
                notify("Issue was updated", `/issues/${data.actionData._id}`);
                break;                
            case 'ISSUE_DELETED':
                issueDeleted(data.actionData);
                break;         
            case 'IMAGE_UPDATED':
                issueImageUpd(data.actionData.id);
                notify("Issue was updated", `/issues/${data.actionData.id}`);
                break;
            default:
                break;
        }        
    }

    const handleVoting = data => {
        switch(data.actionType) {
            case 'VOTING_ADDED':
                votingAdded(new VotingModel(data.actionData));
                notify("New voting was added", `/voting/${data.actionData._id}`);
                break;
            case 'VOTING_UPDATED':
                votingUpdated(new VotingModel(data.actionData));
                notify("Voting was updated", `/voting/${data.actionData._id}`);
                break;
            default:
                break;
        }
    }

    const handleTenants = data => {
        switch(data.actionType) {            
            case 'TENANT_DELETED':
                if(data.actionData._id === auth.user._id) {
                    tenantDeleted();
                }
                break;         
            default:
                break;
        }
    }
    const notify = (text, redirectTo) => toast.info(text, { onClick: () => redirectTo ? history.push(redirectTo) : '' });
            
    return (
        <div>            
            <ToastContainer />
        </div>
    );
};

MessagingClient.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    issues: PropTypes.array.isRequired,
    messages: PropTypes.array.isRequired,
    tenants: PropTypes.array.isRequired,
    votes: PropTypes.array.isRequired,
    issueAdded: PropTypes.func.isRequired,
    issueUpdated: PropTypes.func.isRequired,
    issueDeleted: PropTypes.func.isRequired,
    issueImageUpd: PropTypes.func.isRequired,
    messageAdded: PropTypes.func.isRequired,
    messageUpdated: PropTypes.func.isRequired,
    messageDeleted: PropTypes.func.isRequired,
    messageImageUpd: PropTypes.func.isRequired,
    tenantDeleted: PropTypes.func.isRequired,
    votingAdded: PropTypes.func.isRequired,
    votingUpdated: PropTypes.func.isRequired
 }
  
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    issues: state.issue,
    messages: state.message,
    tenants: state.tenant,
    votes: state.voting,   
});

const mapDispatchToProps = (dispatch) => ({
    issueAdded: issue => dispatch(addIssue(issue)),
    issueUpdated: issue => dispatch(editIssue(issue)),
    issueDeleted: issue  => dispatch(removeIssue(issue)),
    issueImageUpd: id  => dispatch(issueImageUpdated (id)),
    messageAdded: message => dispatch(addMessage(message)),
    messageUpdated: message => dispatch(editMessage(message)),
    messageDeleted: message  => dispatch(removeMessage(message)),
    messageImageUpd: id  => dispatch(messageImageUpdated (id)),
    tenantDeleted: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        wsClient.close();
        dispatch(setCurrentUser({}))    
    },
    votingAdded: voting => dispatch(addVoting (voting)),
    votingUpdated: voting => dispatch(editVoting(voting))
});

export default connect(mapStateToProps, mapDispatchToProps)(MessagingClient);