import {MODIFICA_ADD_CONTATO_EMAIL, ADICIONA_CONTATO_SUCESSO, ADICIONA_CONTATO_ERRO, LOADING_ADD_CONTATO} from '../actions/types';

const INITIAL_STATE={
    add_contato_email:'',
    erro_adicionar_contato:'',
    loading:false,
}

export default (state = INITIAL_STATE, action) =>{
    console.log(action);
    switch(action.type){
        case MODIFICA_ADD_CONTATO_EMAIL:
            return{...state,add_contato_email:action.payload, erro_adicionar_contato:""}

        case ADICIONA_CONTATO_ERRO:
            return{...state, erro_adicionar_contato:action.payload, loading:false}

        case ADICIONA_CONTATO_SUCESSO:
            return{...state, add_contato_email:"", loading:false}

        case LOADING_ADD_CONTATO:
            return{...state, loading:true}
        
        default:
            return state;

    }

}
