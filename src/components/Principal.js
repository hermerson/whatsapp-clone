import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import TabBarMenu from './TabBarMenu';
import Conversas from './Conversas';
import Contatos from './Contatos';


const FirstRoute = () => (
  <Conversas/>
);
const SecondRoute = () => (
  <Contatos/>
);

export default class Principal extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'Conversas' },
      { key: 'second', title: 'Contatos' },
    ],
  };


  _renderTabBar = props => (
          
    <TabBar 
      {...props}
      // scrollEnabled
      indicatorStyle={styles.indicator}
      style={styles.tabbar}
      tabStyle={styles.tab}
      labelStyle={styles.label}
    />

);


  render() {
    return (
      <TabView

        renderTabBar={this._renderTabBar}
        navigationState={this.state}
        renderScene={SceneMap({
          first: FirstRoute,
          second: SecondRoute,
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width , height:Dimensions.get('window').height}}

      />
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  indicator: {
    backgroundColor: '#ffffff',
    height: 2,
  }, 
  tabbar: {
    backgroundColor: "#115E54",
    elevation:0            
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    borderTopColor: '#000',
    elevation:0
  },
  label: {
    fontSize: 20,
    marginTop: 1.5,
    marginBottom: 1.5,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
});