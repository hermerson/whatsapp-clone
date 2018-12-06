import React from 'react';
import {View, ListView, TouchableOpacity, Text, Image} from 'react-native';
import { conversasUsuarioFetch} from '../actions/AppActions';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Actions} from 'react-native-router-flux';

class Conversas extends React.Component{



    renderRow(conversas){
        console.log(conversas);
        return(
        <TouchableOpacity style={{}} onPress={()=>{
                if(conversas.tipo=="e"){
                    Actions.conversa({title:conversas.contatoNome,contatoNome:conversas.contatoNome, contatoEmail:conversas.contatoEmail});
                }else{
                    Actions.conversa({title:conversas.nome,contatoNome:conversas.nome, contatoEmail:conversas.contatoEmail});
                }
            }}> 
            <View style={{flex:1, paddingLeft:10, paddingTop:5, paddingBottom:10,  flexDirection:'row', borderBottomWidth:1, borderColor:'#CCC'}}>
                <View>
                    <Image source={require('../assets/generic-user.png')} style={{width:50, height:50}}/>
                </View>
                
                <View style={{paddingLeft:10, paddingTop:10,}}>
                    <Text style={{fontSize:20}}>{conversas.tipo=="r"?conversas.nome:conversas.contatoNome}</Text>

                    <View style={{flexDirection:'row', paddingLeft:5}}>
                        {conversas.tipo=="e"?<Image source={require('../assets/check.png')} style={{width:20, height:20}}/>:null}
                        <Text style={{fontSize:15, paddingLeft:3}}>{conversas.ultimaMensagem}</Text>
                    </View>

                </View>
            </View>
         </TouchableOpacity>
         
        )
    }

    criaFonteDeDados(conversas){
        const ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1!==r2});

        this.fonteDeDados = ds.cloneWithRows(conversas)
    }

    componentWillMount(){
        this.props.conversasUsuarioFetch();
        this.criaFonteDeDados(this.props.conversas);
    }

    componentWillReceiveProps(nextProps){
        this.criaFonteDeDados(nextProps.conversas);
    }

    render(){
        return(
            <View style={{flex:1}}>
                    <ListView 
                        enableEmptySections
                        dataSource={this.fonteDeDados}
                        renderRow={this.renderRow}
                    />
             
                
            </View>
        )
    }
}



const mapStateToProps = state =>{
    const conversas = _.map(state.ListaConversasReducer, (val,uid)=>{
        return{...val, uid}
    }).splice(0).reverse();
    console.log(conversas)
    return{conversas}
}

export default connect(mapStateToProps,{conversasUsuarioFetch})(Conversas);