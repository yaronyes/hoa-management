import { ADD_MESSAGE, SET_MESSAGES, EDIT_MESSAGE, REMOVE_MESSAGE, GET_ERRORS, LOADING_MESSAGES, MESSAGES_LOADED, MESSAGE_IMAGE_UPDATED } from './types';
import MessageModel from '../models/MessageModel';
import axios from 'axios';
import { getOptions } from '../utils/getAuthToken';
import { uploadImage } from '../utils/utils';

export const setMessages = (messages) => ({
    type: SET_MESSAGES,
    messages
});

export const addMessage = (message) => ({
    type: ADD_MESSAGE,
    message
});

export const editMessage = (message) => ({
    type: EDIT_MESSAGE,
    message
});

export const removeMessage = ({ id }) => ({
    type: REMOVE_MESSAGE,
    id
});

export const loadingMessages = () => ({
    type: LOADING_MESSAGES    
});

export const messagesLoaded = () => ({
    type: MESSAGES_LOADED    
});

export const messageImageUpdated = (id) => ({
    type: MESSAGE_IMAGE_UPDATED,
    id    
});

export const createMessage = (message, image) => async dispatch => {
    try {
        const response = await axios.post('/messages', message, getOptions());
        dispatch(addMessage(new MessageModel(response.data)));
        if (image) {
            try {
                await uploadImage(`/messages/${response.data._id}/image`, image, 'image');
                dispatch(messageImageUpdated(response.data._id));
            } catch (e) {
                console.log(e);
            }
        }        
    } catch (e) {
        console.log(e);
        dispatch({
            type: GET_ERRORS,
            payload: e
        })
    }
};

export const deleteMessage = ({ _id }) => async dispatch => {
    try {
        const response = await axios.delete(`/messages/${_id}`, getOptions());
        dispatch(removeMessage({ id: response.data._id }));
    } catch (e) {
        console.log(e);
        dispatch({
            type: GET_ERRORS,
            payload: e
        })
    }
};

export const getMessages = () => async dispatch => {
    try {
        dispatch(loadingMessages());
        const response = await axios.get('/messages', getOptions());
        dispatch(messagesLoaded());
        if(response.data.length !== 0) {
            const messages = response.data.map(message => new MessageModel(message));
            dispatch(setMessages(messages));
        }        
    } catch (e) {
        console.log(e);
        dispatch({
            type: GET_ERRORS,
            payload: e
        })
    }
};

export const updateMessage = (updates, id, image) => async dispatch =>  {
    try {                      
        if(Object.keys(updates).length !== 0) {
            const response = await axios.patch(`/messages/${id}`, updates, getOptions());
            dispatch(editMessage(new MessageModel(response.data)));
        } 

        if (image) {
            try {
                await uploadImage(`/messages/${id}/image`, image, 'image');
                dispatch(messageImageUpdated(id));
            } catch (e) {
                console.log(e);
            }
        }
    } catch (e) {
        console.log(e);
        dispatch({
            type: GET_ERRORS,
            payload: e
        })
    }
};

export const addCommentForMessage = (comment, id) => async dispatch =>  {
    try{
        const response = await axios.post(`/comment/message/${id}`, comment, getOptions());
        dispatch(editMessage(new MessageModel(response.data)));                         
    } catch (e) {
        console.log(e);
        dispatch({
            type: GET_ERRORS,
            payload: e
        })
    }
};

export const setSeenBy = (id) => async dispatch =>  {
    try{
        const response = await axios.post(`/messages/${id}/seen`, {}, getOptions());
        dispatch(editMessage(new MessageModel(response.data)));                        
    } catch (e) {
        console.log(e);
        dispatch({
            type: GET_ERRORS,
            payload: e
        })
    }
};