import React from 'react';
import {View, Text, Button, Image, ImageBackground} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default props =>(
    <ImageBackground style={{flex:1,}} source={require('../assets/bg.png')}>
        <View style={{flex:1, padding:15, alignItems:'center', justifyContent:'center'}}>
            <View style={{flex:2, justifyContent:'center', alignItems:'center'}}>
                <Text style={{color:'#FFF', fontSize:20}}>Seja Bem-Vindo!</Text>
                <Image source={require('../assets/logo.png')} />
            </View>
            
            <View style={{flex:1, width:'100%'}}>
                <Button title='Fazer Login' color='#115E54' onPress={()=>{Actions.formLogin()}}/>
            </View>

        </View>
    </ImageBackground>
)
