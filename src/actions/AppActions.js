import {MODIFICA_ADD_CONTATO_EMAIL,
        ADICIONA_CONTATO_SUCESSO,
        ADICIONA_CONTATO_ERRO,
        LOADING_ADD_CONTATO,
        LISTA_CONTATO_USUARIO,
        MODIFICA_MENSAGEM, 
        ENVIA_MENSAGEM,
        LISTA_CONVERSA_USUARIO,
        LISTA_CONVERSAS_USUARIO} from './types';
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
        firebase.database().ref(`/usuario_contatos/${emailUsuarioB64}`).on('value', snapshot=>{
            dispatch({type:LISTA_CONTATO_USUARIO,payload:snapshot.val()});
           
        })
    }

}

export const modificaMensagem = (texto)=>{
    return{
        type:MODIFICA_MENSAGEM,
        payload:texto
    }
}

export const enviaMensagem = (mensagem, contatoNome, contatoEmail)=>{
    const {currentUser} = firebase.auth();
    
    return(dispatch)=>{
        const data = new Date();
        const usuarioEmailB64 = b64.encode(currentUser.email);
        const contatoEmailB64 = b64.encode(contatoEmail);
        dispatch({type:ENVIA_MENSAGEM,})
        firebase.database().ref(`/mensagens/${usuarioEmailB64}/${contatoEmailB64}`)
        .push({mensagem, tipo:"e", timestamp:data.getTime()})
        .then((res)=>{
            console.log(res);
            firebase.database().ref(`/mensagens/${contatoEmailB64}/${usuarioEmailB64}`)
            .push({mensagem, tipo:"r", timestamp:data.getTime()})
            .then(()=>{
                
            })
        })
        .then(()=>{ //ARMAZENAR CABEÇALHO USUARIO
            firebase.database().ref(`/usuario_conversas/${usuarioEmailB64}/${contatoEmailB64}`)
            .set({contatoNome, contatoEmail, ultimaMensagem:mensagem});
        })
        .then(()=>{ //ARMAZENAR CABEÇALHO CONTATO

            firebase.database().ref(`/contatos/${usuarioEmailB64}`)
                .once('value')
                .then(snapshot=>{
                    const dadosUsuario=_.first(_.values(snapshot.val()));
                    firebase.database().ref(`/usuario_conversas/${contatoEmailB64}/${usuarioEmailB64}`)
                    .set({nome:dadosUsuario.nome, contatoEmail})

            })

            
        })
    }
}

export const conversaUsuarioFetch = (contatoEmail) => {
    
    return (dispatch)=>{

        const {currentUser} = firebase.auth();
        const usuarioEmailB64 = b64.encode(currentUser.email);
        const contatoEmailB64 = b64.encode(contatoEmail);
      

        firebase.database().ref(`/mensagens/${usuarioEmailB64}/${contatoEmailB64}`).on('value', snapshot=>{
            const mensagens = _.orderBy(snapshot.val(), ['timestamp']);

            
            dispatch({type:LISTA_CONVERSA_USUARIO, payload:mensagens});
        })
    }
}


export const conversasUsuarioFetch=()=>{
    const {currentUser} = firebase.auth();

    return (dispatch)=>{
        let emailUsuarioB64 = b64.encode(currentUser.email);
        firebase.database().ref(`/usuario_conversas/${emailUsuarioB64}`).on('value', snapshot=>{
            dispatch({type:LISTA_CONVERSAS_USUARIO, payload:snapshot.val()});
           
        })
    }

}