import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';


firebase.auth().onAuthStateChanged((user) =>{
  console.log(Actions)
  Actions.principal();
});