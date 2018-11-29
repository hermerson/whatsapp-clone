import React from 'react';
import {View, TextInput, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import {modificaMensagem, enviaMensagem} from '../actions/AppActions'

class Conversa extends React.Component{

    _enviaMensagem(){
        const {mensagem, contatoNome, contatoEmail} = this.props;
        this.props.enviaMensagem(mensagem, contatoNome, contatoEmail);
    }

    render(){
        return(
            <View style={{flex:1, backgroundColor:'#eee4dc', padding:10}}>
               <View style={{flex:1, paddingBottom:20}}></View>


               <View style={{flexDirection:'row', height:60}}>
                    <TextInput value={this.props.mensagem} onChangeText={texto=>{this.props.modificaMensagem(texto)}} style={{flex:4, backgroundColor:'#fff', fontSize:18, borderRadius:60}}/>
                    <TouchableOpacity onPress={this._enviaMensagem.bind(this)}>
                        <Image source={require('../assets/enviar_mensagem.png')}/>
                    </TouchableOpacity>
               </View>
            </View>
        )
    }
}



const mapStateToProps = (state) =>(
    {
        mensagem:state.AppReducer.mensagem,
    }
)

export default connect(mapStateToProps, {modificaMensagem, enviaMensagem})(Conversa);