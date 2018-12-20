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
         <TouchableOpacity onPress={()=>{
             Actions.conversa({title:conversas.contatoNome,contatoNome:conversas.contatoNome, contatoEmail:conversas.contatoEmail});
         }}>
             <View style={{flex:1,flexDirection:'row', padding:10, borderBottomWidth:1, borderColor:'#CCC',}}>
                <View >
                    <Image source={require('../assets/generic-user.png')} style={{width:50, height:50}}/>
                </View>
                
                <View style={{flexDirection:'column', paddingLeft:10}}>
                    <Text style={{fontSize:20, fontWeight:'500'}}>{conversas.contatoNome}</Text>
                    <View style={{flexDirection:'row', paddingLeft:3}}>
                        {conversas.tipo=="e"?<Image source={require('../assets/check.png')} style={{width:20, height:20, paddingTop:25}}/>:null}
                        <Text style={{fontSize:15}}>{conversas.ultimaMensagem.length>30?conversas.ultimaMensagem.substring(0,30)+' ...':conversas.ultimaMensagem}</Text>
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
    const conversas = _.map(state.ListaConversasReducer.conversas, (val,uid)=>{
        return{...val, uid}
    }).splice(0).reverse();
    return{conversas}
}

export default connect(mapStateToProps,{conversasUsuarioFetch})(Conversas);