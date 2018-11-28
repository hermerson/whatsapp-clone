import {MODIFICA_ADD_CONTATO_EMAIL, ADICIONA_CONTATO_SUCESSO, ADICIONA_CONTATO_ERRO, LOADING_ADD_CONTATO, LISTA_CONTATO_USUARIO} from './types';
import b64 from 'base-64';
import firebase from 'react-native-firebase';
import _ from 'lodash';
import Toast from 'react-native-simple-toast';

export const modificaAddContatoEmail = (texto) =>{
    return{
        type: MODIFICA_ADD_CONTATO_EMAIL,
        payload: texto
    }
}

export const adicionaContato = (email) =>{

    return (dispatch) =>{

        dispatch({type:LOADING_ADD_CONTATO});

        let emailB64 = b64.encode(email);
        firebase.database().ref(`/contatos/${emailB64}`).once('value')
            .then(snapshot=>{
                if(snapshot.val()){
                    const dadosUsuario = _.first(_.values(snapshot.val()));
                    console.log(dadosUsuario);
                    const {currentUser} = firebase.auth();
                    let emailUserB64 = b64.encode(currentUser.email);
                    firebase.database().ref(`/usuario_contatos/${emailUserB64}`).push({email, nome:dadosUsuario.nome}).then(res=>{
                        Toast.show('Cadastro Realizado com sucesso', Toast.LONG);
                        dispatch({type:ADICIONA_CONTATO_SUCESSO})
                    }).catch(erro=>{
                        dispatch({type:ADICIONA_CONTATO_ERRO, payload:erro.message});
                    });
                }else{
                    dispatch({type:ADICIONA_CONTATO_ERRO, payload:"Usuario nao existe"});
                }
        }).catch(erro=>{
            dispatch({type:ADICIONA_CONTATO_ERRO, payload:erro.message});
        })

    }

}


export const contatosUsuarioFetch=()=>{
    const {currentUser} = firebase.auth();

    return (dispatch)=>{
        let emailUsuarioB64 = b64.encode(currentUser.email);
        firebase.database().ref(`/usuarios_contatos/${emailUsuarioB64}`).on('value', snapshot=>{
            console.log(snapshot.val());
           
        })
    }

}