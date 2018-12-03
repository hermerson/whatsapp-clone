import React, {Component} from 'react';
import {Router, Scene} from 'react-native-router-flux';
import FormLogin from './src/components/FormLogin';
import FormCadastro from './src/components/FormCadastro';
import BoasVindas from './src/components/BoasVindas'
import {StyleSheet} from 'react-native';
import Principal from './src/components/Principal';
import AdicionarContato from './src/components/AdicionarContato';
import Conversa from './src/components/Conversa';

export default props=>(
    <Router>
        <Scene key='wrap' navigationBarStyle={styles.navBar} titleStyle={styles.txtTitulo} hideBackImage={true} hideNavBar={true} >
            <Scene key='formLogin'  component={FormLogin} />
            <Scene key='formCadastro'  component={FormCadastro} />
            <Scene key='boasVindas'  component={BoasVindas} />
            <Scene key='addContato' component={AdicionarContato} title="Adicionar Contato" hideNavBar={false} />
            <Scene key='conversa' component={Conversa} title="" hideNavBar={false} />
            <Scene key='principal'  component={Principal} title='WhatsApp Clone' hideNavBar={false}  initial/>
        </Scene>
    </Router>
)


const styles = StyleSheet.create({
    content:{
      flex:1,
  },
  txtTitulo:{
    flex:1,
    fontSize:18,
    color:'#FFf',
    textAlign:'left',
  },
  navBar:{
    backgroundColor:'#115E54',
  },
  });
  
