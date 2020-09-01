import { ADD_MESSAGE, SET_MESSAGES, EDIT_MESSAGE, REMOVE_MESSAGE, MESSAGE_IMAGE_UPDATED } from '../actions/types';

const initialState =  [];

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_MESSAGES:
            return [
                ...action.messages
            ];
        case ADD_MESSAGE:
            return [
                ...state,
                action.message
            ];
        case REMOVE_MESSAGE:
            return state.filter(({ _id }) => _id !== action.id);
        case EDIT_MESSAGE:
            return state.map(message => {
                if(message._id === action.message._id) {
                    return action.message;
                } else {
                    return message;       
                }
            });
        case MESSAGE_IMAGE_UPDATED:
            return state.map(message => {
                if(message._id === action.id) {
                    return {
                        ...message,
                        haveImage: true
                    };
                } else {
                    return message;       
                }
            });
        default:
            return state;
    };
};