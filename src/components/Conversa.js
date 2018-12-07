import React from 'react';
import {View, TextInput, TouchableOpacity, Image, ListView, Text} from 'react-native';
import {connect} from 'react-redux';
import {modificaMensagem, enviaMensagem, conversaUsuarioFetch} from '../actions/AppActions'
import _ from 'lodash';



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
        this.props.enviaMensagem(mensagem, contatoNome, contatoEmail);
    }

    renderRow(texto){
        if(texto.tipo==="e"){
            return(
                <View style={{alignItems:'flex-end', marginBottom:5, marginTop:5, marginLeft:40, borderRadius:100}}>

                     <Text style={{fontSize:18, color:'#000', padding:10, backgroundColor:'#bdF5b4', elevation:1}}>{texto.mensagem}</Text>
                 
                </View>
            )
        }
        return(
            <View style={{alignItems:'flex-start', marginBottom:5, marginTop:5, marginRight:40, borderRadius:100}}>

                <Text style={{fontSize:18, color:'#000', padding:10, backgroundColor:'#f7f7f7', elevation:1}}>{texto.mensagem}</Text>

            </View>
         
        )
    }
 

    render(){

        return(
            <View style={{flex:1, backgroundColor:'#eee4dc', padding:10}}>
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