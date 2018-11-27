import {MODIFICA_EMAIL,
        MODIFICA_NOME,
        MODIFICA_SENHA,
        CADASTRO_USUARIO_ERRO,
        CADASTRO_USUARIO_SUCESSO, 
        LOGIN_USUARIO_ERRO,
        LOGIN_USUARIO_SUCESSO,
        LOADING} from '../actions/types';

const INITIAL_STATE={
    nome:'',
    email:'',
    senha:'',
    erroCadastro:'', 
    erroLogin:'',
    loading:false
}

export default (state = INITIAL_STATE, action) =>{
    console.log(action);
    switch(action.type){
        case MODIFICA_NOME:
            return{...state,nome:action.payload}

        case MODIFICA_EMAIL:
            return {...state, email:action.payload}
        
        case MODIFICA_SENHA:
            return {...state, senha:action.payload}

        case CADASTRO_USUARIO_ERRO:
            return {...state, erroCadastro:action.payload, loading:false}

        case CADASTRO_USUARIO_SUCESSO:
            return {...state, nome:'', senha:'', loading:false}

        case LOGIN_USUARIO_ERRO:
            return {...state, erroLogin:action.payload, loading:false}
        
        case LOGIN_USUARIO_SUCESSO:
            return {...state, loading:false}
        
        case LOADING:
            return{...state, loading:true}

        default:
            return state;

    }
    
}