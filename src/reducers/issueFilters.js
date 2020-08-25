import { SET_TEXT_FILTER_ISSUE, SORT_BY_DATE_ISSUE, SORT_BY_PRIORITY_ISSUE, SET_STATUS_FILTER_ISSUE } from '../actions/types';

// Issue Filters Reducer

const issueFiltersDefaultState = {
  text: '',
  sortBy: 'createdAt',
  status: ''
};

export default (state = issueFiltersDefaultState, action) => {
  switch (action.type) {
    case SET_TEXT_FILTER_ISSUE:
      return {
        ...state,
        text: action.text
      };
    // case SET_STATUS_FILTER_ISSUE:
    //   return {
    //     ...state,
    //     status: action.status
    //   }
    case SORT_BY_PRIORITY_ISSUE:
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