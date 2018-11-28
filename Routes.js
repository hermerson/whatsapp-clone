import React, {Component} from 'react';
import {Router, Scene} from 'react-native-router-flux';
import FormLogin from './src/components/FormLogin';
import FormCadastro from './src/components/FormCadastro';
import BoasVindas from './src/components/BoasVindas'
import {StyleSheet} from 'react-native';
import Principal from './src/components/Principal';

export default props=>(
    <Router>
        <Scene key='wrap' navigationBarStyle={styles.navBar} titleStyle={styles.txtTitulo} hideNavBar={true} >
            <Scene key='formLogin'  component={FormLogin} />
            <Scene key='formCadastro'  component={FormCadastro} />
            <Scene key='boasVindas'  component={BoasVindas} />
            <Scene key='principal'  component={Principal} title='WhatsApp Clone' hideNavBar={false} initial />
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
  
