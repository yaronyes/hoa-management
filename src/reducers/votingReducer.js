import { ADD_VOTING, SET_VOTING, EDIT_VOTING } from '../actions/types';

const initialState =  [];

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_VOTING:
            return [
                ...action.voting
            ]
        case ADD_VOTING:
            return [
                ...state,
                action.voting
            ];
        case EDIT_VOTING:
            return state.map(voting => {
                if(voting._id === action._id) {
                    return {
                        ...action.voting
                    }; 
                } else {
                    return voting;       
                }
            });
        default:
            return state;
    };
};