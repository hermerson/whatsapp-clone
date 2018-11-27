import React,{Component} from 'react';
import {View, Text, TextInput, Button, TouchableOpacity, ImageBackground, StyleSheet, Image ,StatusBar, ActivityIndicator} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';
import {modificaEmail, modificaSenha, autenticarUsuario} from '../actions/AutenticacaoActions';

class formLogin  extends Component{



    _autenticarUsuario(){
        
        const {email, senha} = this.props;
        this.props.autenticarUsuario(email,senha);
    }

    renderBtnAcessar(){
        if(this.props.loading){
            return(<ActivityIndicator size="large"/>)
        }
        return(
            <Button  title="Acessar" color="#115E54" onPress={()=>{this._autenticarUsuario()}}></Button>
        )
    }
    
    render(){
        return(
            <ImageBackground style={{flex:1}} source={require('../assets/bg.png')}>
                <View style={{flex:1, padding:1, justifyContent:'center', alignItems:'center'}}>
                <StatusBar backgroundColor='#115E54'/>
                    <View style={{flex:3, justifyContent:"center", paddingTop:30}}>

                        <TextInput value={this.props.email} 
                            onChangeText={texto =>{this.props.modificaEmail(texto)}} 
                            placeholder="E-mail" placeholderTextColor='#FFF' 
                            style={styles.input}/>

                        <TextInput value={this.props.senha}  
                            onChangeText={texto =>{this.props.modificaSenha(texto)}} 
                            placeholder="Senha" placeholderTextColor='#FFF' 
                            style={styles.input} secureTextEntry/>

                        <Text style={{color:'red', fontSize:12, }}>{this.props.erroLogin}</Text>

                        <TouchableOpacity onPress={()=>{
                            Actions.formCadastro();
                        }}>
                            <Text style={{fontSize:20, color:'#00FFFF', paddingTop:15}}>Ainda nao tem cadastro? Cadastre-se</Text>
                        </TouchableOpacity>
                    
                    </View>

                    <View style={{flex:2, justifyContent:'center', width:'90%'}}>
                       {this.renderBtnAcessar()}
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
        email:state.AutenticacaoReducer.email,
        senha:state.AutenticacaoReducer.senha,
        erroLogin:state.AutenticacaoReducer.erroLogin, 
        loading:state.AutenticacaoReducer.loading
    }
)




export default connect(mapStateToProps, {modificaEmail, modificaSenha, autenticarUsuario})(formLogin)


 
    

   


