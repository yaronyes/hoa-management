import { SET_TEXT_FILTER_ISSUE, SORT_BY_DATE_ISSUE, SORT_BY_PRIORITY_ISSUE/*, SET_STATUS_FILTER_ISSUE*/ } from './types';

// SET_TEXT_FILTER
export const setTextFilter = (text = '') => ({
    type: SET_TEXT_FILTER_ISSUE,
    text
  });
  
  // SORT_BY_DATE
  export const sortByDate = () => ({
    type: SORT_BY_DATE_ISSUE
  });


  //SORT_BY_PRIORITY
  export const sortByPriority = () => ({
    type: SORT_BY_PRIORITY_ISSUE
  });

//   // SET_STATUS_FILTER_ISSUE
// export const setStatusFilter = (status = '') => ({
//   type: SET_STATUS_FILTER_ISSUE,
//   status
// });