import {MODIFICA_ADD_CONTATO_EMAIL, ADICIONA_CONTATO, ADICIONA_CONTATO_ERRO} from './types';
import b64 from 'base-64';
import firebase from 'react-native-firebase';
import _ from 'lodash';

export const modificaAddContatoEmail = (texto) =>{
    return{
        type: MODIFICA_ADD_CONTATO_EMAIL,
        payload: texto
    }
}

export const adicionaContato = (email) =>{

    return (dispatch) =>{
        let emailB64 = b64.encode(email);
        firebase.database().ref(`/contatos/${emailB64}`).once('value')
            .then(snapshot=>{
                if(snapshot.val()){
                    const dadosUsuario = _.first(_.values(snapshot.val()));
                    console.log(dadosUsuario);
                    const {currentUser} = firebase.auth();
                    let emailUserB64 = b64.encode(currentUser.email);
                    firebase.database().ref(`/usuario_contatos/${emailUserB64}`).push({email, nome:dadosUsuario.nome}).then(res=>{
                        ToastAndroid.show('Sucesso !', ToastAndroid.SHORT);
                    }).catch(erro=>{
                        console.log(erro);
                    });
                }else{
                    dispatch({type:ADICIONA_CONTATO_ERRO, payload:"Usuario nao existe"});
                }
        }).catch(erro=>{
            dispatch({type:ADICIONA_CONTATO_ERRO, payload:erro.message});
        })

    }

}