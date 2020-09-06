import { SET_TEXT_FILTER_VOTING, /* SET_SORT_DIRECTION_VOTING */ } from '../actions/types';

// Voting Filters Reducer

const votingFiltersDefaultState = {
  text: '',
  //status: '',
  sortBy: 'createdAt',
  //sortDirection: 'asc'
};

export default (state = votingFiltersDefaultState, action) => {
  switch (action.type) {
    case SET_TEXT_FILTER_VOTING:
        return {
            ...state,
            text: action.text
        };   
    // case SET_SORT_DIRECTION_VOTING:            
    //     return {
    //         ...state,
    //         sortDirection: action.sortDirection
    //     }; 
    default:
      return state;
  }
};