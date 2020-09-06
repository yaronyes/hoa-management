import { SET_TEXT_FILTER_VOTING, /*SET_SORT_DIRECTION_VOTING */ } from './types';

// SET_TEXT_FILTER_VOTING
export const setTextFilter = (text = '') => ({
    type: SET_TEXT_FILTER_VOTING,
    text
});

// //SET_SORT_DIRECTION_VOTING
// export const setSortDirection = (sortDirection = 'asc') => ({
//     type: SET_SORT_DIRECTION_VOTING,
//     sortDirection
// });

// export const updateSortDirection = sortDirection => dispatch => dispatch(setSortDirection(sortDirection));


