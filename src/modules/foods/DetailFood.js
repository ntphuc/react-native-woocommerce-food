import React, {Component, PropTypes } from 'react';
import {
	Image,
	Text,
	TouchableOpacity,
	View,
	ScrollView,
	AsyncStorage,
	Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';
import styles from './styles/DetailFood';
import { iconsMap } from '../../utils/AppIcons';
import { PRICE_UNIT,CARDS_KEY } from '../../constants/constants';
const iconStar = (<Icon name="md-star" size={16} color="#F5B642" />);
var cards=[];
var foodDTO={};
export default class DetailFood extends Component{
	constructor(props){
		super(props);
		// this.state={
		// 	foodDTO:null
		// };
		c=this;
		this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
	}
	_onNavigatorEvent(event) {
		if (event.type === 'NavBarButtonPress') {
			if (event.id === 'close') {
				this.props.navigator.dismissModal();
			}
			else if (event.id === 'cart') {
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
				this.props.navigator.push({
					screen: 'foodapp.Cart',
					title: 'Giỏ hàng',
					navigatorButtons: {

					}
				});
			}
		}
	}
	componentWillMount() {



				foodDTO= this.clone(this.props.foodDTO);
// 				Object.defineProperty(foodDTO, 'soluong', {
//     value: 0,
// 		writable: true,
// 		enumerable:true
//
// });
				foodDTO['soluong']=0;


	}

	getCards = async () => {
		 try {

			 v = await AsyncStorage.getItem(CARDS_KEY);
			 	if (v!=null){
					console.log('v=====', v);
					cards = JSON.parse(v);
					var isExist=false;
					console.log('list cards before', cards.length);


						var stt = cards.findIndex((e)=>{
							return e.id==foodDTO.id
							    });

						if (stt==-1){
							//khong tim thay

										foodDTO['soluong']=1;
										cards.push(foodDTO);
						}else{
							cards[stt]['soluong'] += 1;
						}

				}	else{
			 			console.log("is null",v);

						foodDTO['soluong']=1;
						cards.push(foodDTO);
					}
console.log('new foodDTO', foodDTO['soluong']);
					console.log('list cards after', cards.length);
					console.log('content cards after', cards)
					this.setCards().done();
		 }catch (error){
			 console.log('getCards', error);
		 }
	 }
	 setCards = async () => {
	 	 try {
	 		await AsyncStorage.setItem(CARDS_KEY,JSON.stringify(cards));
	 	 }catch (error){
	 		 console.log('setCards', error);
	 	 }
	  }
	checkOut(foodDTO){
		console.log('checkout', foodDTO.title);

		try{

				this.getCards().done();






			}
			catch (error){
					console.log("test cards error",error);
			}


	}

  render(){

    return(

			<ScrollView
				style={styles.container}>
					<Swiper
						style={styles.swiper}
						autoplay
						autoplayTimeout={4}
						showsPagination={false}
						height={248}
						loop
						index={5}>
						{
							foodDTO.images.map((item, index) => (
								<View key={item.id}>
									<Image source={{ uri: item.src }} style={styles.imageBackdrop} />
									<LinearGradient colors={['rgba(0, 0, 0, 0.2)', 'rgba(0,0,0, 0.2)', 'rgba(0,0,0, 0.7)']} style={styles.linearGradient} />
								</View>
							))
						}
					</Swiper>
					<View style={styles.cardContainer}>
						<Image source={{ uri: foodDTO.featured_src }} style={styles.cardImage} />
						<View style={styles.cardDetails}>
							<Text style={styles.cardTitle}>{foodDTO.title}</Text>
							<Text style={styles.cardTagline}>{foodDTO.categories}</Text>

							<View style={styles.cardNumbers}>
								<View style={styles.cardStar}>
									{iconStar}
									<Text style={styles.cardStarRatings}>{foodDTO.average_rating}</Text>
								</View>

							</View>
							<Text style={styles.price}>{foodDTO.price + PRICE_UNIT}</Text>
						</View>
					</View>
					<TouchableOpacity activeOpacity={0.9} onPress={(e)=>this.checkOut(foodDTO)}>
						<View style={styles.viewButtonContainer}>
							<Text style={styles.viewButtonText}>Đặt mua </Text>
						</View>
					</TouchableOpacity>
					<View style={styles.contentContainer}>
						<Text style={styles.cardTagline}>{foodDTO.description.replace(/<\/?[^>]+(>|$)/g, "")}</Text>

					</View>
				</ScrollView>

    );
  }

	 clone(obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = this.clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = this.clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}
}


DetailFood.propTypes = {
	foodDTO: PropTypes.object.isRequired

};

//export default DetailFood;
