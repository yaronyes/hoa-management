import { SET_TEXT_FILTER_TENANT } from '../actions/types';

// tenant Filters Reducer

const tenantFiltersDefaultState = {
  text: ''
};

export default (state = tenantFiltersDefaultState, action) => {
  switch (action.type) {
    case SET_TEXT_FILTER_TENANT:
      return {
        ...state,
        text: action.text
      };    
    default:
      return state;
  }
};