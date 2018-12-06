import React from 'react';
import {View, ListView, TouchableOpacity, Text} from 'react-native';
import { conversasUsuarioFetch} from '../actions/AppActions';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Actions} from 'react-native-router-flux';

class Conversas extends React.Component{



    renderRow(conversas){
        return(
         <TouchableOpacity onPress={()=>{
             Actions.conversa({title:conversas.contatoNome,contatoNome:conversas.contatoNome, contatoEmail:conversas.contatoEmail});
         }}>
             <View style={{flex:1, padding:20, borderBottomWidth:1, borderColor:'#CCC'}}>
                <Text style={{fontSize:25}}>{conversas.contatoNome}</Text>
                <Text style={{fontSize:18, paddingLeft:15}}>{conversas.ultimaMensagem}</Text>
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