/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text, View,Navigator} from 'react-native';
import Login from './components/LoginController.js';
import Register from './components/RegisterController.js';
export default class App extends Component {
  renderScene(route, navigator){
    switch(route.name){
      case 'login' :return (
         <Login
            goRegister={()=>{
              navigator.push({name:'register'})
              }}
         />
        );
      case 'register' :return (
         <Register/>
       );
    }
  }
  render() {
    return (
     <Navigator
       initialRoute={{name:'login'}}
       renderScene={this.renderScene}
     />
    );
  }
}
