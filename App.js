
import React, {Component} from 'react';

import Routes from './Routes';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './src/reducers';
import ReduxThunk from 'redux-thunk';

export default class App extends Component{
  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Routes/>
      </Provider>
        
    
    );
  }
}

