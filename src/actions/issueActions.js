import { ADD_ISSUE, SET_ISSUES, EDIT_ISSUE, DELETE_ISSUE, LOADING_ISSUES, ISSUES_LOADED, GET_ERRORS, ISSUE_IMAGE_UPDATED } from './types';
import IssueModel from '../models/IssueModel';
import axios from 'axios';
import { getOptions } from '../utils/getAuthToken';
import { uploadImage } from '../utils/utils';

export const setIssues = (issues) => ({
    type: SET_ISSUES,
    issues
});

export const addIssue = (issue) => ({
    type: ADD_ISSUE,
    issue
});

export const editIssue = (issue) => ({
    type: EDIT_ISSUE,
    issue
});

export const removeIssue = ({ id }) => ({
    type: DELETE_ISSUE,
    id
});

export const loadingIssues = () => ({
    type: LOADING_ISSUES    
});

export const issuesLoaded = () => ({
    type: ISSUES_LOADED    
});

export const issueImageUpdated = (id) => ({
    type: ISSUE_IMAGE_UPDATED,
    id    
});


export const createIssue = (issue, image) => async dispatch => {
    try{        
        const response = await axios.post('/issues', issue, getOptions());        
        if (image) {
            try {
                await uploadImage(`/issues/${response.data._id}/image`, image, 'image');
            } catch (e) {
                console.log(e);
            }
        }
        dispatch(addIssue(new IssueModel(response.data)));
    } catch (e) {
        console.log(e);
        dispatch({
            type: GET_ERRORS,
            payload: e
        })
    }
};

export const getIssues = () => async dispatch => {
    try{
        dispatch(loadingIssues());
        const response = await axios.get('/issues', getOptions());
        dispatch(issuesLoaded());
        if(response.data.length !== 0) {
            const issues = response.data.map(issue => new IssueModel(issue));
            dispatch(setIssues(issues));
        }        
    } catch (e) {
        console.log(e);
        dispatch({
            type: GET_ERRORS,
            payload: e
        })
    }
};

export const updateIssue = (updates, id, image) => async dispatch =>  {
    try{
        if (image) {
            try {
                await uploadImage(`/issues/${id}/image`, image, 'image');
            } catch (e) {
                console.log(e);
            }
        }

        if(Object.keys(updates).length !== 0) {
            const response = await axios.patch(`/issues/${id}`, updates, getOptions());
            dispatch(editIssue(new IssueModel(response.data)))                            
        } else if(image) {
            dispatch(issueImageUpdated(id));
        }
    } catch (e) {
        console.log(e);
        dispatch({
            type: GET_ERRORS,
            payload: e
        })
    }
};


export const deleteIssue = ({ _id }) => async dispatch => {
    try{
        const response = await axios.delete(`/issues/${_id}`, getOptions());
        dispatch(removeIssue({ id: response.data._id }));
    } catch (e) {
        console.log(e);
        dispatch({
            type: GET_ERRORS,
            payload: e
        })
    }
};

export const addCommentForIssue = (comment, id) => async dispatch =>  {
    try{
        const response = await axios.post(`/comment/issue/${id}`, comment, getOptions());
        dispatch(editIssue(new IssueModel(response.data)));                         
    } catch (e) {
        console.log(e);
        dispatch({
            type: GET_ERRORS,
            payload: e
        })
    }
};