import {LISTA_CONVERSAS_USUARIO} from '../actions/types';

const INITIAL_STATE={
    conversas:{}
}

export default (state = INITIAL_STATE, action) =>{

    switch(action.type){
        
        case LISTA_CONVERSAS_USUARIO:
            return {...state, conversas:action.payload}
        default:
            return state;

    }

}
