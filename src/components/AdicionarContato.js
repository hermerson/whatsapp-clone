import React from 'react';
import {View, TextInput, Button, StyleSheet, Text, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {modificaAddContatoEmail,adicionaContato} from '../actions/AppActions'

class AdicionarContato extends React.Component{

    renderBtnAddContato(){
        if(this.props.loading){
            return(<ActivityIndicator size="large"/>)
        }
        return (<Button title="Adicionar" color="#115E54" onPress={()=>{
                    if(!this.props.add_contato_email==""){
                        this.props.adicionaContato(this.props.add_contato_email);
                    }
                    
                }}></Button>)
    }

    render(){
        return(
            <View style={{flex:1,  padding:20}}>
                <View style={{flex:3, paddingTop:100}}>
                    <TextInput value={this.props.add_contato_email} onChangeText={(texto)=>{this.props.modificaAddContatoEmail(texto)}} placeholder="E-mail" placeholderTextColor='black' style={styles.input}/>
                    <Text style={{color:'red', fontSize:15, }}>{this.props.erro_adicionar_contato}</Text>
                </View>
                    
                <View style={{flex:1}}>
                    {this.renderBtnAddContato()}
                </View>

                
            </View>
        )
    }
}


const styles = StyleSheet.create({
    input: {
        
        height: 40,
        margin:4,
        borderColor: '#000',
        borderWidth: 1,
        fontSize:20,
        height:45,
        color:'black' ,
          
     },
})

const mapStateToProps = state =>(
    {
        add_contato_email:state.AppReducer.add_contato_email,
        erro_adicionar_contato:state.AppReducer.erro_adicionar_contato,
        loading:state.AppReducer.loading

    }
)

export default connect(mapStateToProps, {modificaAddContatoEmail, adicionaContato})(AdicionarContato);
