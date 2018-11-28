import React from 'react';
import {View} from 'react-native';
import ActionButton from 'react-native-action-button';
import {Actions} from 'react-native-router-flux';

export default class Contatos extends React.Component{

    render(){
        return(
            <View style={{flex:1}}>
                <View style={{flex:3}}>
                
                </View>
                <View style={{flex:1}}>
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


