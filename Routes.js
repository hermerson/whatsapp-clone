import React, {Component} from 'react';
import {Router, Scene} from 'react-native-router-flux';
import FormLogin from './src/components/FormLogin';
import FormCadastro from './src/components/FormCadastro';
import BoasVindas from './src/components/BoasVindas'
import {StyleSheet} from 'react-native';

export default props=>(
    <Router>
        <Scene key='wrap' >
            <Scene key='formLogin'  component={FormLogin} title='WhatsApp Clone' navigationBarStyle={styles.navBar} titleStyle={styles.txtTitulo}/>
            <Scene key='formCadastro'  component={FormCadastro} title='WhatsApp Clone' navigationBarStyle={styles.navBar} titleStyle={styles.txtTitulo}/>
            <Scene key='boasVindas'  component={BoasVindas} title='WhatsApp Clone' navigationBarStyle={styles.navBar} titleStyle={styles.txtTitulo} />
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
    textAlign:'center',
  },
  navBar:{
    backgroundColor:'#115E54',
  },
  });
  
