import reactotron from './ReactotronConfig';
import {persistStore, persistReducer} from 'redux-persist';
import { applyMiddleware} from 'redux';
import reducers from './src/reducers';
import ReduxThunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';

const persistConfig ={
    key:'root',
    storage,
    blacklist:'AutenticacaoReducer'

};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = reactotron.createStore(persistedReducer, {}, applyMiddleware(ReduxThunk))
const persistor = persistStore(store);

export {store, persistor};