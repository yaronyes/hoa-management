import { SET_TEXT_FILTER_TENANT, SET_SORT_DIRECTION_TENANT } from '../actions/types';

// tenant Filters Reducer

const tenantFiltersDefaultState = {
  text: '',
  sortBy: 'createdAt',
  sortDirection: 'asc'
};

export default (state = tenantFiltersDefaultState, action) => {
  switch (action.type) {
    case SET_TEXT_FILTER_TENANT:
      return {
        ...state,
        text: action.text
      };
    case SET_SORT_DIRECTION_TENANT:   
    return {
        ...state,
        sortDirection: action.sortDirection
    }; 
    default:
      return state;
  }
};