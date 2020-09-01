import React, { useState, useEffect } from 'react';
//import config from '../../config/config.json';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';     
import { getIssues } from '../../actions/issueActions';
//import io from 'socket.io-client';
import { getVoting } from '../../actions/votingActions';
import  { getTenantUsers } from '../../actions/tenantActions';
import { getMessages } from '../../actions/messageActions';
import wsClient from '../../utils/WebSocketClient';

//const socket = io(config.server_url);

const MessagingClient = ({ auth, getVoting, getIssues, getTenantUsers, getMessages }) => {
    const [connected, setConnected] = useState(false);
    useEffect(() => {
        if(connected) {
            wsClient.setOnRefreshCallback(data => {                
                if(data.userId !== auth.user._id) {
                    switch(data.model) {
                        case 'messages':
                            getMessages();
                            break;
                        case 'tenants':
                            getTenantUsers();
                            break;
                        case 'voting':
                            getVoting();
                            break;  
                        case 'issues':
                            getIssues();
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
            
    return (
        <div>
            
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
    getIssues: PropTypes.func.isRequired,
    getVoting: PropTypes.func.isRequired,
    getTenantUsers: PropTypes.func.isRequired,
    getMessages: PropTypes.func.isRequired,
 }
  
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    issues: state.issue,
    messages: state.message,
    tenants: state.tenant,
    votes: state.voting,   
});

export default connect(mapStateToProps, { getIssues, getVoting, getTenantUsers, getMessages })(MessagingClient);