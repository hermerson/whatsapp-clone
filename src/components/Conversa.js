import React from 'react';
import {View, TextInput, TouchableOpacity, Image, ListView, Text, ImageBackground} from 'react-native';
import {connect} from 'react-redux';
import {modificaMensagem, enviaMensagem, conversaUsuarioFetch} from '../actions/AppActions'
import _ from 'lodash';
import axios from 'axios';


class Conversa extends React.Component{
    

    componentWillMount(){
        
        this.props.conversaUsuarioFetch(this.props.contatoEmail);
        this.criaFonteDeDados(this.props.conversa);
       
        
    }


    componentWillReceiveProps(nextProps){
        this.criaFonteDeDados(nextProps.conversa);

    }

    criaFonteDeDados(conversa){
        const ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1!==r2});

        this.dataSource = ds.cloneWithRows(conversa)
        
    }
    _enviaMensagem(){
        const {mensagem, contatoNome, contatoEmail} = this.props;
        if(!mensagem==""){
            this.props.enviaMensagem(mensagem, contatoNome, contatoEmail);
        }
        
    }

    renderRow(texto){
        
        
        if(texto.tipo==="e"){
            return(
                <View style={{alignItems:'flex-end', marginBottom:2, marginTop:2, marginLeft:40}}>

                    <View style={{backgroundColor:'#bdF5b4',  elevation:1, borderRadius:10, flexDirection:'row', alignItems:'flex-end',  marginLeft:40}}>  
                        <Text style={{fontSize:18, color:'#000', padding:5, paddingRight:10 }}>{texto.mensagem}</Text>
                        <Text style={{paddingRight:10, fontSize:12}}>{texto.hora}</Text>
                    </View>
                    
                 
                </View>

            )
        }
        return(
            <View style={{alignItems:'flex-start', marginBottom:5, marginTop:5, marginRight:40}}>

                    <View style={{backgroundColor:'#f7f7f7',  elevation:1, borderRadius:10, flexDirection:'row', alignItems:'flex-end'}}>  
                        <Text style={{fontSize:18, color:'#000', padding:5, paddingRight:10 }}>{texto.mensagem}</Text>
                        <Text style={{paddingRight:10, fontSize:12}}>{texto.hora}</Text>
                    </View>

            </View>
         
        )
    }
 

    render(){

        return(
            <ImageBackground style={{flex:1}} source={require('../assets/background_chat.jpg')}> 
            <View style={{flex:1,  padding:10}}>
               <View style={{flex:1, paddingBottom:20}}>
                    <ListView
                        enableEmptySections
                        dataSource={this.dataSource}
                        renderRow={this.renderRow}
                        ref={listView=>this.listView=listView}
                        onContentSizeChange={ () => {        
                            this.listView.scrollToEnd( { animated: false } )
                        } } 
                        
                    />
               </View>


               <View style={{flexDirection:'row', height:50}}>
                    <TextInput placeholder='Digite aqui...' value={this.props.mensagem} onChangeText={texto=>{this.props.modificaMensagem(texto)}} onTouchStart={()=>{
                        setTimeout(()=>{
                            this.listView.scrollToEnd( { animated: false } )
                        }, 250);
                    }} style={{flex:4, backgroundColor:'#fff', fontSize:18, borderRadius:60, marginRight:5}} />
                    <TouchableOpacity onPress={this._enviaMensagem.bind(this)}>
                        <Image source={require('../assets/enviar_mensagem.png')}/>
                    </TouchableOpacity>
               </View>
            </View>
            </ImageBackground>
        )
    }
}



mapStateToProps = (state) =>{

    const conversa = _.map(state.ListaConversaReducer.conversa, (val, uid)=>{
        return {...val, uid};
    })
    //console.log(conversa);

    return{
        conversa,
        mensagem:state.AppReducer.mensagem,
    }
}

export default connect(mapStateToProps, {modificaMensagem, enviaMensagem, conversaUsuarioFetch})(Conversa);