import firebase from 'react-native-firebase';
import {Actions} from 'react-native-router-flux';
export const modificaNome = (texto)=>{
    return{
        type:'MODIFICA_NOME',
        payload:texto
    }
}

export const modificaEmail = (texto)=>{
    return{
        type:'MODIFICA_EMAIL',
        payload:texto
    }
}

export const modificaSenha = (texto)=>{
    return{
        type:'MODIFICA_SENHA',
        payload:texto
    }
}

export const  cadastraUsuario = ({nome,email,senha})=>{

   return (dispatch)=>{
        firebase.auth().createUserWithEmailAndPassword(email,senha)
        .then(user=>{
            cadastroUsuarioSucesso(dispatch);
        }).catch(erro=>{
            cadastroUsuarioErro(erro,dispatch);
        })
   }

   
  
}

const cadastroUsuarioSucesso = (dispatch) =>{
    dispatch({ type:'CADASTRO_USUARIO_SUCESSO'});

    Actions.boasVindas();
}

const cadastroUsuarioErro = (erro,dispatch) =>{
    dispatch(
        { 
            type:'CADASTRO_USUARIO_ERRO',
            payload:erro.message
        
        }
    );
}