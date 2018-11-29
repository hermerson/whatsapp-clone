import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

const reactotron = Reactotron
  .configure({ 
      host:'100.73.42.65',
      name: 'SOS App', 
      port: 9090 
      }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .use(reactotronRedux())
  .connect()

console = reactotron

export default reactotron