import React, {Component} from "react";
import {View, Text,StyleSheet} from "react-native";
import CardContact from './components/CardContact';
export default class Contact extends Component{
  render(){
    return(
      <View style={styles.container}>
        <CardContact/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'black',
		paddingTop: 64,
		marginBottom:50
	},
})
