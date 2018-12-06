import React, {Component} from 'react';
import reactotron from './ReactotronConfig';
import Routes from './Routes';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './src/reducers';
import ReduxThunk from 'redux-thunk';
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';


export default class App extends Component{

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) =>{
      Actions.principal();
    });
  }

  render() {
    return (
      <Provider store={reactotron.createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Routes/>
      </Provider>
        
    
    );
  }
}

