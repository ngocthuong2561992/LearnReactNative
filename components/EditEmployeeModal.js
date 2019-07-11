import React, { Component } from 'react';
import {
    AppRegistry, FlatList, StyleSheet, Text, View, Image, Alert,
    Platform, TouchableHighlight, Dimensions,
    TextInput
} from 'react-native';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import flatListData from '../data/flatListData';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { updateEmployeeToServer } from '../networking/Server';


var screen=Dimensions.get('window');

var radio_props = [
    {label: 'Female', value: 0 },
    {label: 'Male', value: 1 }
  ];
var screen = Dimensions.get('window');
export default class EditEmployeeModal extends Component {
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
    showEditModal = (editing, flatlistItem) => {
        // console.log(`editingFood = ${JSON.stringify(editingFood)}`);
        this.setState({
            key: editing._id,
            name: editing.name,
            sex: editing.sex,
            password: editing.password,
            department: editing.department,
            email: editing.email,
            image: editing.image,
            flatlistItem: flatlistItem
        });
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
                    justifyContent: 'center',
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
                }}>Employee's information</Text>
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
                <Button
                    style={{ fontSize: 18, color: 'white' }}
                    containerStyle={{
                        padding: 8,
                        marginLeft: 70,
                        marginRight: 70,
                        height: 40,
                        borderRadius: 6,
                        backgroundColor: 'mediumseagreen'
                    }}
                    onPress={() => {
                         if (this.state.foodName.length == 0 || this.state.foodDescription.length == 0) {
                            alert("You must enter food's name and description");
                            return;
                        }
                        //Update existing Food
                    //    var foundIndex = flatListData.findIndex(item => this.state.key == item.key);
                    //    if (foundIndex < 0) {
                    //        return; //not found
                    //    }
                    //    flatListData[foundIndex].name = this.state.foodName;
                    //    flatListData[foundIndex].foodDescription = this.state.foodDescription;
                        //Refresh flatlist item
                        let params = {
                          // key: newKey,
                          name: this.state.newName,
                          sex: this.state.rdnGT,
                          password: this.state.newPassword,
                          department: this.state.newDepartment,
                          email: this.state.newEmail,
                          image: this.state.newLinkImage,
                          };
                          updateAFood(params).then((result) => {
                             console.log(`this.state.flatlistItem = ${this.state.flatlistItem}`);
                             if (result === 'ok') {
                                 this.state.flatlistItem.refreshFlatListItem({
                                     _id: this.state.key,
                                     name: this.state.newName,
                                     sex: this.state.rdnGT,
                                     password: this.state.newPassword,
                                     department: this.state.newDepartment,
                                     email: this.state.newEmail,
                                     image: this.state.newLinkImage,
                                 });
                                 this.refs.myModal.close();
                             }
                         }).catch((error) => {
                             console.log(`error = ${error}`);
                             this.refs.myModal.close();
                         });
                         //Refresh flatlist item
                         // this.state.flatlistItem.refreshFlatListItem();
                         // this.refs.myModal.close();
                    }}>
                    Save
                </Button>
            </Modal>
        );
    }
}
