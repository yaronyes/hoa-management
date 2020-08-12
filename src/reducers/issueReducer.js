import { ADD_ISSUE, SET_ISSUES, EDIT_ISSUE } from '../actions/types';

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
        case EDIT_ISSUE:
            return state.map(issue => {
                if(issue._id === action._id) {
                    return {
                        ...action.issue
                    }; 
                } else {
                    return issue;       
                }
            });
        default:
            return state;
    };
};