import { LOADING_ISSUES, ISSUES_LOADED, LOADING_TENANTS, TENANTS_LOADED, LOADING_VOTES, VOTES_LOADED, LOADING_MESSAGES, MESSAGES_LOADED } from '../actions/types';

const initialState = {
    loadingIssues: false,
    loadingTenants: false,
    loadingMessages: false,
    loadingVotes: false    
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
        case LOADING_ISSUES:
            return {
                ...state,
                loadingIssues: true,          
            };
        case ISSUES_LOADED:
            return {
                ...state,
                loadingIssues: false,          
            };
        case LOADING_TENANTS:
            return {
                ...state,
                loadingTenants: true,          
            };
        case TENANTS_LOADED:
            return {
                ...state,
                loadingTenants: false,          
            };
        case LOADING_VOTES:
            return {
                ...state,
                loadingVotes: true,          
            };
        case VOTES_LOADED:
            return {
                ...state,
                loadingVotes: false,          
            };
        case LOADING_MESSAGES:
            return {
                ...state,
                loadingMessages: true,          
            };
        case MESSAGES_LOADED:
            return {
                ...state,
                loadingMessages: false,          
            };                                    
        default:
            return state;
    };
  };