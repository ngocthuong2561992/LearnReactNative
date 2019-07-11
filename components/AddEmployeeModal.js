import React, { Component } from 'react';
import {
    AppRegistry, FlatList, StyleSheet, Text, View, Image, Alert,
    Platform, TouchableHighlight, Dimensions,ToastAndroid,
    TextInput
} from 'react-native';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { insertEmployeeToServer } from '../networking/Server';

var screen=Dimensions.get('window');

var radio_props = [
    {label: 'Female', value: 0 },
    {label: 'Male', value: 1 }
  ];
export default class AddEmployeeModal extends Component{
  constructor(props) {
       super(props);
       this.state = {
           employeeFromServer: [],
           newName: '',
           newEmail: '',
           newPassword : '',
           rdnGT:3,
           newDepartment : '',
           newLinkImage : '',
       };
   }


  showAddModal=()=>{
    this.refs.myModal.open();
  }
  generateKey = (numberOfCharacters) => {
       return require('random-string')({length: numberOfCharacters});
  }

  render() {
    return (
      <Modal
        ref={"myModal"}
        style={{
          borderRadius: Platform.OS === 'ios' ? 30 : 0,
          shadowRadius: 10,
          width: screen.width - 80,
          height: 480
        }}
        position='center'
        backdrop={true}
        onClosed={() => {
          // alert("Modal closed");
        }}
      >
      <Text style={{
         fontSize: 16,
         fontWeight: 'bold',
         textAlign: 'center',
         marginTop: 40
       }}>New employee's information
       </Text>
        <TextInput style={{
          height: 40,
          borderBottomColor: 'gray',
          marginLeft: 30,
          marginRight: 30,
          marginTop: 20,
          marginBottom: 10,
          borderBottomWidth: 1
        }}
        onChangeText={(text) => this.setState({ newName: text })}
        placeholder="Enter new's name"
        value={this.state.newName}
        />
        <RadioForm
          style={{
          height: 40,
          borderBottomColor: 'gray',
          marginLeft: 30,
          marginRight: 30,
          marginTop: 20,
          marginBottom: 10,
          }}
          radio_props={radio_props}
          initial={3}
          onPress={(value) => {this.setState({rdnGT:value})}}
        />

        <TextInput style={{
          height: 40,
          borderBottomColor: 'gray',
          marginLeft: 30,
          marginRight: 30,
          marginTop: 10,
          marginBottom: 20,
          borderBottomWidth: 1
        }}
        onChangeText={(text) => this.setState({ newEmail: text })}
        placeholder="Enter new's email"
        value={this.state.newEmail}
        />

        <TextInput style={{
          height: 40,
          borderBottomColor: 'gray',
          marginLeft: 30,
          marginRight: 30,
          marginTop: 20,
          marginBottom: 10,
          borderBottomWidth: 1
        }}
        onChangeText={(text) => this.setState({ newPassword: text })}
        placeholder="Enter new's password"
        returnKeyType='go'
        secureTextEntry
        value={this.state.newPassword}
        />

        <TextInput style={{
          height: 40,
          borderBottomColor: 'gray',
          marginLeft: 30,
          marginRight: 30,
          marginTop: 20,
          marginBottom: 10,
          borderBottomWidth: 1
        }}
        onChangeText={(text) => this.setState({ newDepartment: text })}
        placeholder="Enter new's department"
        value={this.state.newDepartment}
        />

        <TextInput style={{
          height: 40,
          borderBottomColor: 'gray',
          marginLeft: 30,
          marginRight: 30,
          marginTop: 20,
          marginBottom: 10,
          borderBottomWidth: 1
        }}
        onChangeText={(text) => this.setState({ newLinkImage: text })}
        placeholder="Enter new's LinkImage"
        value={this.state.newLinkImage}
        />
        <Button  style={{ fontSize: 18, color: 'white' }}
         containerStyle={{
           padding: 8,
           marginLeft: 70,
           marginRight: 70,
           height: 40,
           borderRadius: 6,
           backgroundColor: 'mediumseagreen'
           }}
           onPress={() => {
             if (this.state.newName.length == 0 || this.state.newEmail.length == 0) {
                 alert("You must enter's newEmail")
                 return;
               }
               const newKey = this.generateKey(24);
               const newFood = {
                 // key: newKey,
                 name: this.state.newName,
                 sex: this.state.rdnGT,
                 password: this.state.newPassword,
                 department: this.state.newDepartment,
                 email: this.state.newEmail,
                 image: this.state.newLinkImage,
                        };
		                   // var {employeeFromServer}=this.state;
                       //  callApi('employee','POST',{
                       //
                       //    name: this.state.newName,
                       //    sex: this.state.rdnGT,
                       //    password: this.state.newPassword,
                       //    department: this.state.newDepartment,
                       //    email: this.state.newEmail,
                       //    image: this.state.newLinkImage,
                       //      }).then(res => {
                       //        //  history.goBack();
                       //          // employeeFromServer.push(data);
                       //          this.props.parentFlatList.refreshDataFromServer();
                       //      });
                        // flatListData.push(newFood);
                      // this.props.parentFlatList.refreshFlatList(newKey);
                        insertEmployeeToServer(newFood).then((result) => {
                              if (result === 'ok') {
                                  this.props.parentFlatList.refreshDataFromServer();
                              }
                          });
                          this.refs.myModal.close();
                    }}>
                    Save
                </Button>
            </Modal>
    )
  }
}
