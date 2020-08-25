import { SET_TEXT_FILTER_ISSUE, SORT_BY_DATE_ISSUE, SORT_BY_PRIORITY__ISSUE } from '../actions/types';

// Issue Filters Reducer

const issueFiltersDefaultState = {
  text: '',
  sortBy: 'createdAt',
};

export default (state = issueFiltersDefaultState, action) => {
  switch (action.type) {
    case SET_TEXT_FILTER_ISSUE:
      return {
        ...state,
        text: action.text
      };
    case SORT_BY_PRIORITY__ISSUE:
      return {
        ...state,
        sortBy: 'priority'
      };
    case SORT_BY_DATE_ISSUE:
      return {
        ...state,
        sortBy: 'createdAt'
      };    
    default:
      return state;
  }
};