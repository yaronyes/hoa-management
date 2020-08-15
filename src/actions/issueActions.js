import { ADD_ISSUE, SET_ISSUES, EDIT_ISSUE, GET_ERRORS } from './types';
import IssueModel from '../models/IssueModel';
import axios from 'axios';
import { getOptions } from '../utils/getAuthToken';

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

export const createIssue = (issue) => async dispatch => {
    try{
        const response = await axios.post('/issues', issue, getOptions());
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
        const response = await axios.get('/issues', getOptions());
        const issues = response.data.map(issue => new IssueModel(issue));
        dispatch(setIssues(issues));
    } catch (e) {
        console.log(e);
        dispatch({
            type: GET_ERRORS,
            payload: e
        })
    }
};

export const updateIssue = (updates, id) => async dispatch =>  {
    try{
        let response;
        if(Object.keys(updates).length !== 0) {
            response = await axios.patch(`/issues/${id}`, updates, getOptions());
            dispatch(editIssue(new IssueModel(response.data)))                            
        }       
    } catch (e) {
        console.log(e);
        dispatch({
            type: GET_ERRORS,
            payload: e
        })
    }
};