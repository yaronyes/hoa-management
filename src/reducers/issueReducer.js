import { ADD_ISSUE, SET_ISSUES, EDIT_ISSUE, DELETE_ISSUE } from '../actions/types';

const initialState =  [];

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_ISSUES:
            return [
                ...action.issues
            ]
        case ADD_ISSUE:
            return [
                ...state,
                action.issue
            ];
        case DELETE_ISSUE:
            return state.filter(({ _id }) => _id !== action.id);    
        case EDIT_ISSUE:
            return state.map(issue => {
                if(issue._id === action.issue._id) {
                    return action.issue;
                } else {
                    return issue;       
                }
            });
        default:
            return state;
    };
};