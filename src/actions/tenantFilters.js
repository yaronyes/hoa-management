import { SET_TEXT_FILTER_TENANT, SET_SORT_DIRECTION_TENANT } from './types';

// SET_TEXT_FILTER
export const setTextFilter = (text = '') => ({
    type: SET_TEXT_FILTER_TENANT,
    text
});

//SET_SORT_DIRECTION_TENANT
export const setSortDirection = (sortDirection = 'asc') => ({
    type: SET_SORT_DIRECTION_TENANT,
    sortDirection
});

export const updateSortDirection = sortDirection => dispatch => dispatch(setSortDirection(sortDirection));
  
  