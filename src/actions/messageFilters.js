import { SET_TEXT_FILTER_MESSAGE, SORT_BY_DATE_MESSAGE, SORT_BY_PRIORITY_MESSAGE, SET_PRIORITY_FILTER_MESSAGE, SET_SORT_DIRECTION_MESSAGE } from './types';

// SET_TEXT_FILTER
export const setTextFilter = (text = '') => ({
    type: SET_TEXT_FILTER_MESSAGE,
    text
});

// SORT_BY_DATE
export const sortByDate = () => ({
    type: SORT_BY_DATE_MESSAGE
});


// SORT_BY_PRIORITY
export const sortByPriority = () => ({
    type: SORT_BY_PRIORITY_MESSAGE
});

// SET_PRIORITY_FILTER
export const setPriorityFilter = (priority = '') => ({
    type: SET_PRIORITY_FILTER_MESSAGE,
    priority
});

//SET_SORT_DIRECTION_MESSAGE
export const setSortDirection = (sortDirection = 'asc') => ({
    type: SET_SORT_DIRECTION_MESSAGE,
    sortDirection
});

export const updateSortDirection = sortDirection => dispatch => dispatch(setSortDirection(sortDirection));