import React from 'react';
import {View, ListView, Text, TouchableOpacity} from 'react-native';
import ActionButton from 'react-native-action-button';
import {Actions} from 'react-native-router-flux';
import {contatosUsuarioFetch} from '../actions/AppActions'
import {connect} from 'react-redux';
import _ from 'lodash';

class Contatos extends React.Component{

   renderRow(contato){
       return(
        <TouchableOpacity onPress={()=>{
            Actions.conversa({title:contato.nome,contatoNome:contato.nome, contatoEmail:contato.email});
        }}>
            <View style={{flex:1, padding:20, borderBottomWidth:1, borderColor:'#CCC'}}>
                <Text style={{fontSize:25}}>{contato.nome}</Text>
                <Text style={{fontSize:18}}>{contato.email}</Text>
            </View>
        </TouchableOpacity>
        
       )
   }

    componentWillMount(){
        this.props.contatosUsuarioFetch();
        this.criaFonteDeDados(this.props.contatos);
        
    }

    componentWillReceiveProps(nextProps){
        this.criaFonteDeDados(nextProps.contatos);
    }

    criaFonteDeDados(contatos){
        const ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1!==r2});

        this.fonteDeDados = ds.cloneWithRows(contatos)
        
    }

    render(){
        return(
            <View style={{flex:1}}>
                <View style={{flex:3}}>
                    <ListView 
                        enableEmptySections
                        dataSource={this.fonteDeDados}
                        renderRow={this.renderRow}
                    />
                    <ActionButton 
                        position='right'
                        buttonColor="#115E54"
                        onPress={() => {Actions.addContato()}}
                    />

                </View>
                
            </View>
        )
    }
}

const mapStateToProps = state =>{
    const contatos = _.map(state.ListaContatosReducer, (val,uid)=>{
        return{...val, uid}
    }).splice(0).reverse();
    return{contatos}
}

export default connect(mapStateToProps,{contatosUsuarioFetch})(Contatos);


