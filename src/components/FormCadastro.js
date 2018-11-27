import React, {Component} from 'react';
import {View, Text, TextInput, Button, ImageBackground, StyleSheet, ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';
import {modificaEmail, modificaSenha,modificaNome, cadastraUsuario} from '../actions/AutenticacaoActions';

class formCadastro extends Component{

    _cadastraUsuario(){
        const {nome, email, senha} = this.props;

        this.props.cadastraUsuario({nome,email,senha});
    }

    renderBtnCadastrar(){
        if(this.props.loading){
            return(<ActivityIndicator size="large"/>)
        }
        return (<Button title="Cadastrar" color="#115E54" onPress={()=>{this._cadastraUsuario()}}></Button>)
    }

    render(){
        return(
            <ImageBackground style={{flex:1}} source={require('../assets/bg.png')}>
                <View style={{flex:1, padding:10,}}>
                
                    <View style={{flex:4, justifyContent:'center'}}>
                        <TextInput value={this.props.nome} onChangeText={texto=>{this.props.modificaNome(texto)}} placeholder="Nome" placeholderTextColor='#FFF' style={styles.input}/>
                        <TextInput value={this.props.email} onChangeText={texto=>{this.props.modificaEmail(texto)}} placeholder="E-mail" placeholderTextColor='#FFF' style={styles.input}/>
                        <TextInput value={this.props.senha} onChangeText={texto=>{this.props.modificaSenha(texto)}} placeholder="Senha" placeholderTextColor='#FFF' style={styles.input} secureTextEntry/>
                        <Text style={{color:'red', fontSize:18, }}>{this.props.erroCadastro}</Text>
                    </View>

                    <View style={{flex:1, width:'100%'}}>
                        {this.renderBtnCadastrar()}
                    </View>
                </View>
            </ImageBackground>
        )
    } 
    
}


const styles = StyleSheet.create({
    input: {
        
        height: 40,
        margin:4,
        borderColor: '#FFF',
        borderWidth: 1,
        fontSize:20,
        height:45,
        color:'#FFF' ,
          
     },
})

const mapStateToProps = state =>(
    {
        nome:state.AutenticacaoReducer.nome,
        email:state.AutenticacaoReducer.email,
        senha:state.AutenticacaoReducer.senha,
        erroCadastro:state.AutenticacaoReducer.erroCadastro,
        loading:state.AutenticacaoReducer.loading
    }
)

export default connect(mapStateToProps, {modificaEmail, modificaSenha, modificaNome, cadastraUsuario})(formCadastro);