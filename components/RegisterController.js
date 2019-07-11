import React, {Component} from 'react';
import {View, Text,TouchableOpacity} from 'react-native';

export default class RegisterController extends Component{
  constructor(props){
    super(props);
    this.state ={
      email : '',
      password : ''
    }
  }
  render(){
    return (
      <View style={{flex:1,backgroundColor:'center', justifyContent:'Content', alignItems:'center'}}>
      <TextInput
        style={{height :40, borderColor:'gray', borderWidth :1 }}
        onChangeText={(email) =>this.setState({email})}
        value={this.state.email}
        />
        <TextInput
          style={{height :40, borderColor:'gray', borderWidth :1 }}
          secuureTextEntry={true}
          onChangeText={(email) =>this.setState({password})}
          value={this.state.password}
          />
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity style={{backgroundColor:'green' , padding:10}}>
              <Text style={{backgroundColor:'green', padding:10}}>
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'green' , padding:10}}
            onPress={()=>{this.props.goRegister()}}
            >
              <Text style={{color:'#fff'}}>
                Register
              </Text>
            </TouchableOpacity>
           </View>





       </View>

    );
  }
}
