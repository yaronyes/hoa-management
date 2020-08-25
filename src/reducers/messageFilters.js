import { SET_TEXT_FILTER_MESSAGE, SORT_BY_DATE_MESSAGE, SORT_BY_PRIORITY_MESSAGE, SET_PRIORITY_FILTER_MESSAGE } from '../actions/types';

// Message Filters Reducer

const messageFiltersDefaultState = {
    text: '',
    priority: '',
    sortBy: 'createdAt',
  };
  
  export default (state = messageFiltersDefaultState, action) => {
    switch (action.type) {
      case SET_TEXT_FILTER_MESSAGE:
        return {
          ...state,
          text: action.text
        };
      case SET_PRIORITY_FILTER_MESSAGE:
        return {
          ...state,
          priority: action.priority
        };  
      case SORT_BY_PRIORITY_MESSAGE:
        return {
          ...state,
          sortBy: 'priority'
        };
      case SORT_BY_DATE_MESSAGE:
        return {
          ...state,
          sortBy: 'createdAt'
        };    
      default:
        return state;
    }
  };