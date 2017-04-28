import React, {Component} from "react";
import {View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
import { PRICE_UNIT, CARDS_KEY } from '../../../constants/constants';
export default class ItemCart extends Component{
  render(){
    return(
      <View style={styles.item}>
        <View style={styles.left}>
          <Image style={styles.img} source={{uri:this.props.HINH}} />
        </View>

          <View style={styles.ten}><Text style={{fontSize: 18,color:'white'}}>{this.props.NAME}</Text></View>
          <View style={{flex:1, flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
              <View style={styles.ngang}>
                <TouchableOpacity>
                  <Text style={{fontSize: 18,color:'white'}}>-</Text>
                </TouchableOpacity>
                  <Text style={{fontSize: 22, marginLeft:10, color:'white'}}>{this.props.SOLUONG}</Text>
                  <TouchableOpacity onPress={()=>{this.props.plusItem(this.props.IDSP)}}>
                    <Text style={{fontSize: 18, marginLeft:10, color:'white'}} >+</Text>
                  </TouchableOpacity>
              </View>
              <Text style={{flex:1, color:'red',fontSize: 18,fontWeight: '100',marginLeft:20,marginTop:20,justifyContent:'center',alignItems:'center', textAlign:'center'}}>{this.props.SOLUONG * this.props.DONGIA+PRICE_UNIT}</Text>
          </View>
    </View>
    );
  }

  // render(){
  //   return(
  //     <View>
  //       <Text>Contact</Text>
  //     </View>
  //   );
  // }
}

var styles=StyleSheet.create({
  item:{flexDirection:"row", padding:10, borderWidth:0.5, borderColor:"gray",alignItems:'center'},
  img:{width:70, height:70},
  left:{flex:1},
  right:{flex:5, flexDirection:"column"},
    ten:{flex:4,marginLeft:20},
    ngang:{flex:1,flexDirection:"row"}
});
