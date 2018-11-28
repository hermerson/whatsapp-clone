import React from 'react';
import {View} from 'react-native';
import ActionButton from 'react-native-action-button';
import {Actions} from 'react-native-router-flux';
import {contatosUsuarioFetch} from '../actions/AppActions'
import {connect} from 'react-redux';

class Contatos extends React.Component{

    componentWillMount(){
        this.props.contatosUsuarioFetch();
    }

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

export default connect(null,{contatosUsuarioFetch})(Contatos);


