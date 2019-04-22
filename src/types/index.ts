export interface Meme {
    link: string
    postedDate: Date
    rank: number
    _id: string
}

export interface Comment { 
    content: string
    meme: string
    postedOn: Date
    _id: string
}

export interface Duel {
    memeOne: Meme,
    memeTwo: Meme,
    startedDate: Date,
    _id: string
}

export enum MemesActionTypes {
    ADD_HOME_MEMES = 'ADD_HOME_MEMES',
    ADD_MEME = 'ADD_MEME',
    LOAD_COMMENTS = 'LOAD_COMMENTS',
    MORE_COMMENTS = 'MORE_COMMENTS',
    ADD_COMMENT = 'ADD_COMMENT',
    TOTAL_COMMENTS = 'TOTAL_COMMENTS'
}

export enum DuelActionTypes {
    ADD_DUEL = 'ADD_DUEL'
}

export enum UiActionTypes {
    START_LOADING = 'START_LOADING',
    FINISH_LOADING = 'FINISH_LOADING',
    TOGGLE_SIDE_MENU = 'TOGGLE_SIDE_MENU',
    CLOSE_SIDE_MENU = 'CLOSE_SIDE_MENU'
}

export type Action<TPayload> = {
    type: string;
    payload: TPayload;
}

export interface UiState {
    sideMenuOpen: boolean
    isLoading: boolean
}