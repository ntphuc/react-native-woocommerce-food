import React, {PropTypes,Component} from "react";
import {View, Text, ScrollView, AsyncStorage, Platform} from "react-native";
import ItemCart from "./components/ItemCart";
import styles from './styles/Cart';
import { PRICE_UNIT, CARDS_KEY } from '../../constants/constants';
var mang=[];
var c;

export default class Cart extends Component{
  constructor(props){
    super(props);
    this.state={
      giohang:[],
      tt:0,
    };
    c=this;
  console.log("constructer card");
    this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
  }
  _onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'search') {
        let rightButtons = [];
        if (Platform.OS === 'ios') {
          rightButtons = [
            {
              id: 'close',
              title: 'Close',
              icon: iconsMap['ios-close']
            }
          ];
        }
        this.props.navigator.showModal({
          screen: 'foodapp.Search',
          title: 'Search',
          navigatorButtons: {
            rightButtons
          }
        });
      }
    }
  }
  plusItem(i){
    console.log(i);
    var stt = mang.findIndex((e)=>{
      return e.id ==i
    });
    mang[stt]['soluong'] += 1;
    c.saveGioHang().done();
    this.loadGioHang().done();
  }

  saveGioHang = async()=>{
    try{
      await AsyncStorage.setItem(CARDS_KEY, JSON.stringify(mang))
    }catch(e){
      console.log(e);
    }
  }

  loadGioHang=async()=>{

        var v = await AsyncStorage.getItem(CARDS_KEY);
        console.log("xxxxxxxxxxxx");
        console.log(v);
        if(v!==null){
          mang = JSON.parse(v);

          var tong = 0;
          mang.map(function(o, i){
            tong = tong + o.soluong * parseInt(o.price);
          });
          this.setState({
            tt:tong
          })

          console.log(mang);
          this.setState({
            giohang: mang
          });
        }


  }


  render(){
    // console.log("render render");
    //   this.loadGioHang().done();
    return(
      <View style={styles.container}>
        <ScrollView>
          <View style={{flex:1}}>
          {(this.state.giohang.length==0)?
						<Text style={styles.browseListItemText}>Chưa có sản phẩm nào trong giỏ hàng</Text>:
            this.state.giohang.map(function(o, i){
                    return <ItemCart  NAME={o.title}
                                  HINH={o.featured_src}
                                  SOLUONG={o.soluong}
                                  DONGIA={parseInt(o.price)}
                                  IDSP={o.id}
                                  key={o.id}
                                  plusItem={(e)=>{c.plusItem(e)}}
                           />;
                   })


					}

          </View>
        </ScrollView>
        <View><Text>Tong tien: {this.state.tt}</Text></View>
      </View>

    );
  }

  componentDidMount(){
   console.log("++++++++++++++");
   this.loadGioHang().done();
  }
}

Cart.propTypes = {

  navigator: PropTypes.object
};
