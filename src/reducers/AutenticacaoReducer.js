const INITIAL_STATE={
    nome:'',
    email:'',
    senha:'',
    erroCadastro:''
}

export default (state = INITIAL_STATE, action) =>{
    console.log(action);
    if(action.type=='MODIFICA_NOME'){
        return{...state,nome:action.payload}
    }
    if(action.type=='MODIFICA_EMAIL'){
        return {...state, email:action.payload}
    }
    if(action.type=='MODIFICA_SENHA'){
        return {...state, senha:action.payload}
    }
    if(action.type=='CADASTRO_USUARIO_ERRO'){
        return {...state, erroCadastro:action.payload}
    }
    if(action.type=='CADASTRO_USUARIO_SUCESSO'){
        return {...state, nome:'', senha:''}
    }
    return state;
}