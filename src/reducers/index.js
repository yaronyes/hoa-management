import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import tenantReducer from './tenantReducer';
import votingReducer from './votingReducer';
import messageReducer from './messageReducer';
import issueReducer from './issueReducer';
import issueFilters from './issueFilters';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    tenant: tenantReducer,
    voting: votingReducer,
    message: messageReducer,
    issue: issueReducer,
    issueFilters: issueFilters
  });