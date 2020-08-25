import { SET_TEXT_FILTER, SORT_BY_DATE, SORT_BY_PRIORITY } from '../actions/types';

// Issue Filters Reducer

const issueFiltersDefaultState = {
  text: '',
  sortBy: 'createdAt',
};

export default (state = issueFiltersDefaultState, action) => {
  switch (action.type) {
    case SET_TEXT_FILTER:
      return {
        ...state,
        text: action.text
      };
    case SORT_BY_PRIORITY:
      return {
        ...state,
        sortBy: 'priority'
      };
    case SORT_BY_DATE:
      return {
        ...state,
        sortBy: 'createdAt'
      };    
    default:
      return state;
  }
};