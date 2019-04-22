import { UiActionTypes, MemesActionTypes, Meme, Duel, Comment, DuelActionTypes, Action } from './../types/index';
import axios from 'axios';
import CONSTANTS from '../const';
import { action } from 'typesafe-actions';
import { push } from 'connected-react-router';
import { AnyAction, Dispatch } from 'redux';

export const toggleSideMenu = () => action(UiActionTypes.TOGGLE_SIDE_MENU)

export const closeSideMenu = () => action(UiActionTypes.CLOSE_SIDE_MENU)

export const addMemesToFrontPage = (memes: Meme[]) => action(MemesActionTypes.ADD_HOME_MEMES, memes)

export const addMeme = (meme: Meme) => action(MemesActionTypes.ADD_MEME, meme)

export const addDuel = (duel: Duel) => action(DuelActionTypes.ADD_DUEL, duel)

export const startLoading = () => action(UiActionTypes.START_LOADING)

export const finishLoading = () => action(UiActionTypes.FINISH_LOADING)

export const loadComments = (comments: Comment[]) => action(MemesActionTypes.LOAD_COMMENTS, comments)

export const moreComments = (comments: Comment[]) =>  action(MemesActionTypes.MORE_COMMENTS, comments)

export const addComment = (comment: Comment) => action(MemesActionTypes.ADD_COMMENT, comment)

export const totalComments = (totalComments: number) => action(MemesActionTypes.TOTAL_COMMENTS, totalComments)

export const getMemes = () => (dispatch: Dispatch) => {
    axios.get(`${CONSTANTS.apiUrl}/memes`)
        .then(res => {
            const memes: Meme[] = res.data;
            dispatch(addMemesToFrontPage(memes));
        });
}

export const getMeme = (memeId: string) => (dispatch: Dispatch) => {
    dispatch(startLoading());
    axios.get(`${CONSTANTS.apiUrl}/memes/${memeId}`)
        .then(res => {
            const meme: Meme = res.data;
            dispatch(addMeme(meme));
            dispatch(finishLoading())
        })
        .catch(err => {
            dispatch(finishLoading())
        });
}

export const getDuel = () => (dispatch: Dispatch) => {
    dispatch(startLoading());
    axios.get(`${CONSTANTS.apiUrl}/duel`)
        .then(res => {
            const duel = res.data;
            dispatch(addDuel(duel));
            dispatch(finishLoading())
        })
        .catch(err => {
            dispatch(finishLoading())
        });
}

export const vote = (duelId: string, memeWinner: string) => (dispatch: Dispatch) => {
    dispatch(startLoading());
    axios.post(`${CONSTANTS.apiUrl}/duel`, { duelId, memeWinner })
        .then(res => {
            axios.get(`${CONSTANTS.apiUrl}/duel`)
                .then(res => {
                    const duel = res.data;
                    dispatch(addDuel(duel));
                    dispatch(finishLoading())
                })
                .catch(err => {
                    dispatch(finishLoading())
                });
        })
        .catch(err => {
            dispatch(finishLoading())
        });
}

export const uploadImage = (link: string) => (dispatch: Dispatch) => {
    axios.post(`${CONSTANTS.apiUrl}/memes`, { link })
        .then(res => {
            dispatch(push(`/memes/${res.data._id}`));
        })
}

export const getComments = (memeId: string) => (dispatch: Dispatch) => {
    axios.get(`${CONSTANTS.apiUrl}/comments/${memeId}`)
        .then(res => {
            const comments = res.data.comments;
            dispatch(totalComments(res.data.count));
            dispatch(loadComments(comments))
        });
}

export const getMoreComments = (memeId:string, offset:number) => (dispatch: Dispatch) => {
    axios.get(`${CONSTANTS.apiUrl}/comments/${memeId}/${offset}`)
        .then(res => {
            const comments = res.data.comments;
            dispatch(totalComments(res.data.count));
            dispatch(moreComments(comments))
        });
}

export const comment = (comment:string, memeId: string) => (dispatch: Dispatch) => {
    axios.post(`${CONSTANTS.apiUrl}/comment/${memeId}`, { content: comment })
        .then(res => {
            const comment = res.data.comment;
            dispatch(addComment(comment));
        })
}