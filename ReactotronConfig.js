import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

const reactotron = Reactotron
  .configure({ 
      host:'150.165.242.159',
      name: 'whatsapp-clone', 
      port: 9091
      }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .use(reactotronRedux())
  .connect()

console = reactotron

export default reactotron