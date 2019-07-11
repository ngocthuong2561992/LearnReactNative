import React, {Component} from 'react';
import {Platform, StyleSheet, Text,Image, View,FlatList,Alert, TouchableHighlight,RefreshControl } from 'react-native';
import Swipeout from 'react-native-swipeout';
import callApi from '../utils/apiCaller';
import AddEmployeeModal from './AddEmployeeModal';
import EditEmployeeModal from './EditEmployeeModal';

class FlatListItem extends Component {
  constructor(props) {
      super(props);
      this.state = {
          activeRowKey: null,
          numberOfRefresh: 0,
          item: {}
      };
  }
  refreshFlatListItem = (changedItem) => {
    console.log(`changedItem = ${JSON.stringify(changedItem)}`);
    this.setState({item: changedItem});
    console.log(`item = ${JSON.stringify(this.state.item)}`);
  }
  render(){
    const swipeSettings={
      autoClose:true,
      onClose : (secId, rowId, direction)=>{
        if(this.state.activeRowKey!=null){
            this.setState({activeRowKey:null});
        }
      },
      onOpen : (secId, rowId, direction)=>{
        this.setState({activeRowKey:this.props.item.key});
      },
      right : [
      {
          onPress: () => {
            // alert("Update");
        //    this.props.parentFlatList.refs.editModal.showEditModal(flatListData[this.props.index], this);
              let selectedItem = this.state.item.name ? this.state.item : this.props.item;
              this.props.parentFlatList.refs.editModal.showEditModal(selectedItem, this);
            },
              text: 'Edit', type: 'primary'
              },
               {
         onPress:()=>{
           const deletingRow=this.state.activeRowKey;
           Alert.alert(
             'Alert',
             'Are you sure you want to delete ?',
             [
               {text: 'No', onPress: ()=>console.log('Cancel Pressed'), style:'cancel'},
               {text: 'Yes', onPress: ()=>{
                 flatListData.splice(this.props.index,1);
                 //Refesh FlatList
                 this.props.parentFlatList.refreshFlatList()
                 }},
             ],
             {cancelable:true}
             );
         },
         text:'Delete', type:'delete'
       }
    ],
    rowId:this.props.index,
    sectionId:1
    }
    return(
 <Swipeout  {...swipeSettings}>
 <View  style={{
   flex:1,
   flexDirection: 'column',
 }}>
 <View style={{
   flex:1,
   flexDirection: 'row',
 //  backgroundColor: this.props.index % 2==0 ? 'mediumseagreen':'tomato'
   backgroundColor:'mediumseagreen'
 }}>
   <Image
       source={{uri:this.props.item.image}}
       style={{width:100,height:100, margin:5}}
   >
   </Image >
   <View style={{
     flex:1,
     flexDirection: 'column'
   }}>
     <Text style={styles.flatListItem}>{this.props.item.name}</Text>
     {this.props.item.sex==1 ?  <Text style={styles.flatListItem}>Male</Text> : <Text style={styles.flatListItem}>Female</Text>}
     <Text style={styles.flatListItem}>{this.props.item.email}</Text>
     <Text style={styles.flatListItem}>{this.props.item.department}</Text>
   </View>

 </View>
 <View
 style={{
   height:1,
   backgroundColor: 'white',
 }}>

 </View>
 </View>
 </Swipeout>
    );
  }
}
const styles=StyleSheet.create({
  flatListItem : {
    color:'white',
    padding:10,
    fontSize:16,
  }
});

export default class EmployeeFlatList extends Component {
  constructor(props) {
        super(props);
        this.state = ({
            deletedRowKey: null,
            refreshing: false,
            employeeFromServer: []
        });
    this._onPressAdd = this._onPressAdd.bind(this);
    }
    componentDidMount() {
          this.refreshDataFromServer();
    }

    refreshDataFromServer=()=>{
     this.setState({ refreshing: true });
     callApi('employee','GET',null).then(res=>{
 			this.setState({
 				employeeFromServer:res.data
 			});
       this.setState({ refreshing: false });
 		}).catch((error) => {
       this.setState({ employeeFromServer: [] });
       this.setState({ refreshing: false });
    });
    }
    onRefresh = () => {
           this.refreshDataFromServer();
       }

       refreshFlatList = (activeKey) => {
       this.setState((prevState) => {
           return {
               deletedRowKey: activeKey
           };
       });
       this.refs.flatList.scrollToEnd();
   }
   _onPressAdd() {
       // alert("You add Item");
       this.refs.addModal.showAddModal();
   }

  render() {
    return (
        <View style={{flex: 1, marginTop: Platform.OS === 'ios' ? 34 : 0}}>
        <View style={{
              backgroundColor: 'tomato',
              flexDirection: 'row',
              justifyContent:'flex-end',
              alignItems: 'center',
              height: 64}}>
              <TouchableHighlight
                  style={{marginRight: 10}}
                  underlayColor='tomato'
                  onPress={this._onPressAdd}
                  >
              <Image
                  style={{width: 35, height: 35}}
                  source={require('../icons/icons-add.png')}
              />
          </TouchableHighlight>
          </View>
         <FlatList
            ref={"flatList"}
            data={this.state.employeeFromServer}
            renderItem={({item,index}) =>{
              //console.log(`Item=${JSON.stringify(item)}, index=${index})`)
              return (
                <FlatListItem item={item} index={index} parentFlatList={this}>
                </FlatListItem>);
              }}
              keyExtractor={(item, index) => item.name}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh}
                        />
                 }
         >
         </FlatList>
         <AddEmployeeModal ref={'addModal'} parentFlatList={this} >
        </AddEmployeeModal>

        <EditEmployeeModal ref={'editModal'} parentFlatList={this} >
       </EditEmployeeModal>
     </View>
    );
  }
}
