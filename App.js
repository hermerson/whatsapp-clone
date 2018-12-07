
import React, {Component} from 'react';
import Routes from './Routes';
import {Provider} from 'react-redux';
import {store, persistor} from './store';
import {PersistGate} from 'redux-persist/integration/react';

export default class App extends Component{

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes/>
        </PersistGate>
      </Provider>
        
    
    );
  }
}

