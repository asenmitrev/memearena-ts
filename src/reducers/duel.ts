import { Meme, DuelActionTypes, Duel } from '../types';
import { Reducer } from 'redux';

interface DuelState {
    duel: null | Duel
}

const defaultState: DuelState = {
    duel: null
};

const reducer:Reducer<DuelState> = (state: DuelState = defaultState, action: any) => {
    switch(action.type){
        case DuelActionTypes.ADD_DUEL: 
            return {...state, duel: action.payload};
        default:
            return state;
    }
}

export default reducer;