import { SET_TEXT_FILTER_TENANT } from './types';

// SET_TEXT_FILTER
export const setTextFilter = (text = '') => ({
    type: SET_TEXT_FILTER_TENANT,
    text
});
  
  