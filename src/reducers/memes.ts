import { Meme, Comment, MemesActionTypes, Action } from '../types';
import { Reducer } from 'redux';

interface MemesState {
    home: Meme[]
    comments: Comment[]
    totalComments: number
    meme: Meme | null
}

const defaultState: MemesState = {
    home: [],
    comments: [],
    totalComments: 0,
    meme: null
};

const reducer: Reducer<MemesState, Action<any>> = (state: MemesState = defaultState, action: Action<any>):MemesState => {
    switch (action.type) {
        case MemesActionTypes.ADD_HOME_MEMES:
            return { ...state, home: action.payload };
        case MemesActionTypes.ADD_MEME:
            return { ...state, meme: action.payload };
        case MemesActionTypes.LOAD_COMMENTS:
            return { ...state, comments: action.payload };
        case MemesActionTypes.MORE_COMMENTS:
            return { ...state, comments: state.comments.concat(action.payload) };
        case MemesActionTypes.ADD_COMMENT:
            return { ...state, comments: state.comments.concat([action.payload]) };
        case MemesActionTypes.TOTAL_COMMENTS:
            return { ...state, totalComments: action.payload };
        default:
            return state;
    }
}

export default reducer;