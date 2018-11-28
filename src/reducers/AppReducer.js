import {MODIFICA_ADD_CONTATO_EMAIL, ADICIONA_CONTATO, ADICIONA_CONTATO_ERRO} from '../actions/types';

const INITIAL_STATE={
    add_contato_email:'',
    erro_adicionar_contato:''
}

export default (state = INITIAL_STATE, action) =>{
    console.log(action);
    switch(action.type){
        case MODIFICA_ADD_CONTATO_EMAIL:
            return{...state,add_contato_email:action.payload, erro_adicionar_contato:""}

        case ADICIONA_CONTATO_ERRO:
            return{...state, erro_adicionar_contato:action.payload}

        default:
            return state;

    }

}
