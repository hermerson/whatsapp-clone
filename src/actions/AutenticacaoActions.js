import firebase from 'react-native-firebase';
import {Actions} from 'react-native-router-flux';
import b64 from 'base-64';
import {MODIFICA_EMAIL,
    MODIFICA_NOME,
    MODIFICA_SENHA,
    CADASTRO_USUARIO_ERRO,
    CADASTRO_USUARIO_SUCESSO, 
    LOGIN_USUARIO_ERRO,
    LOGIN_USUARIO_SUCESSO,
    LOADING} from './types';

export const modificaNome = (texto)=>{
    return{
        type:MODIFICA_NOME,
        payload:texto
    }
}

export const modificaEmail = (texto)=>{
    return{
        type:MODIFICA_EMAIL,
        payload:texto
    }
}

export const modificaSenha = (texto)=>{
    return{
        type:MODIFICA_SENHA,
        payload:texto
    }
}

export const  cadastraUsuario = ({nome,email,senha})=>{

   return (dispatch)=>{

        dispatch({type:LOADING});

        if(nome==="" || email === "" || senha === ""){
            console.log('erro login')
            dispatch({type:CADASTRO_USUARIO_ERRO, payload:"Nome, Login e Senha obrigatorios"});
        }else{
            firebase.auth().createUserWithEmailAndPassword(email,senha)
                .then(user=>{
                    let emailB64 = b64.encode(email);
                    firebase.database().ref('/contatos/'+emailB64).push({nome}).then(values=>{
                        dispatch({ type:CADASTRO_USUARIO_SUCESSO});
                        Actions.boasVindas();
                    }).catch(erro=>{
                        console.log(erro);
                });
            
        }).catch(erro=>{
            dispatch({type:CADASTRO_USUARIO_ERRO, payload:erro.message});
        })
        }

        
   }

   
  
}




export const autenticarUsuario = (email,senha) =>{

    return dispatch =>{

        dispatch({type:LOADING});
        if(email === "" || senha === ""){
            console.log('erro login')
            dispatch({type:LOGIN_USUARIO_ERRO, payload:"Login e senha obrigatorios"});
        }else{
            firebase.auth().signInWithEmailAndPassword(email,senha)
            .then(user=>{
                dispatch({ type:LOGIN_USUARIO_SUCESSO});
                Actions.principal();
            }).catch(erro=>{
                dispatch({type:LOGIN_USUARIO_ERRO, payload:erro.message});
            });
        }
    }
   
   
}

