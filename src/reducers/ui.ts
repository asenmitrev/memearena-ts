import { UiActionTypes, UiState } from '../types';
import { Reducer } from 'redux';

const defaultState:UiState = {
    sideMenuOpen: false,
    isLoading: false
};

const reducer:Reducer<UiState> =  (state:UiState = defaultState, action) => {
    switch(action.type){
        case UiActionTypes.START_LOADING:
            return { ...state, isLoading: true}
        case UiActionTypes.FINISH_LOADING:
            return { ...state, isLoading: false}
        case UiActionTypes.TOGGLE_SIDE_MENU: 
            return { ...state, sideMenuOpen: !state.sideMenuOpen };
        case UiActionTypes.CLOSE_SIDE_MENU:
            return { ...state, sideMenuOpen: false };
        default:
            return state;
    }
}

export default reducer;