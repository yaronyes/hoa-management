import { SET_TEXT_FILTER_VOTING/*, SET_STATUS_FILTER_VOTING*/ } from './types';

// SET_TEXT_FILTER_VOTING
export const setTextFilter = (text = '') => ({
    type: SET_TEXT_FILTER_VOTING,
    text
});

// SET_STATUS_FILTER_VOTING
// export const setStatusFilter = (status = '') => ({
//     type: SET_STATUS_FILTER_VOTING,
//     status
// });


