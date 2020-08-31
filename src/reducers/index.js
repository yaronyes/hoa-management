import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import tenantReducer from './tenantReducer';
import votingReducer from './votingReducer';
import messageReducer from './messageReducer';
import issueReducer from './issueReducer';
import issueFilters from './issueFilters';
import messageFilters from './messageFilters';
import tenantFilters from './tenantFilters';
import votingFilters from './votingFilters';
import loadingReducer from './loadingReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    tenant: tenantReducer,
    voting: votingReducer,
    message: messageReducer,
    issue: issueReducer,
    loader: loadingReducer,
    issueFilters,
    messageFilters,
    tenantFilters,
    votingFilters
});