import React, { PropTypes, Component } from 'react';
import {
	RefreshControl,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
	Platform,
	Linking,
	AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as foodsActions from './foods.actions';
import CardCategory from './components/CardCategory';
import CardOne from './components/CardOne';
import CardTwo from './components/CardTwo';
import CardContact from './components/CardContact';
import ProgressBar from '../_global/ProgressBar';
import styles from './styles/Foods';
import { iconsMap } from '../../utils/AppIcons';
var context;
const navigatorStyle = {
	navBarTranslucent: true,
	drawUnderNavBar: true,
	navBarBackgroundColor:'black',
	navBarTextColor: 'white',
	navBarButtonColor: 'white',
	statusBarTextColorScheme: 'light',
	drawUnderTabBar: true,
	screenBackgroundColor:'black'
};
class Foods extends Component {
	constructor(props) {
		super(props);
		context=this;

		this.state = {
			isLoading: true,
			isRefreshing: false
		};
		this.taoGiohang().done();
		this._viewFood = this._viewFood.bind(this);
		this._viewFoodsList = this._viewFoodsList.bind(this);
		this._onRefresh = this._onRefresh.bind(this);
		this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
	}
	//xu ly: TAO MANG GIO HANG
	taoGiohang = async()=>{
		try{
			var mang=[
				new ITEM("Ionic Framework vs React Native | 24x7Developers",1, 100, 44, "http://static.lazada.vn/cms/2015/campaign-06/seo/ip5-v2.png"),
				new ITEM("iPhone 3",1, 100, 45, "http://static.lazada.vn/cms/2015/campaign-06/seo/ip5-v2.png"),
				new ITEM("iPhone 3",1, 100, 46, "http://static.lazada.vn/cms/2015/campaign-06/seo/ip5-v2.png"),
				new ITEM("iPhone 3",1, 100, 47, "http://static.lazada.vn/cms/2015/campaign-06/seo/ip5-v2.png"),
				new ITEM("iPhone 3",1, 100, 48, "http://static.lazada.vn/cms/2015/campaign-06/seo/ip5-v2.png")
			];
			await AsyncStorage.setItem("@GIOHANG1:key", JSON.stringify(mang))
		}catch(e){
			console.log(e);
		}
	}
	componentWillMount() {
		this._retrieveFoods();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.nowPlayingFoods && nextProps.categories) {
			this.setState({ isLoading: false });
		}
	}

	_retrieveFoods(isRefreshed) {
		console.log("_retrieveFoods"," is runnning");
		this.props.actions.retrieveCategories();
		this.props.actions.retrieveNowPlayingFoods();
		if (isRefreshed && this.setState({ isRefreshing: false }));
	}

	_viewFoodsList(info, listByCat) {
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
			title: 'Category',
			screen: 'foodapp.FoodsList',
			passProps: {
				info,
				listByCat
			},
			navigatorButtons: {
				rightButtons
			}
		});
	}

	_viewFood(foodDTO) {
		this.props.navigator.push({
			screen: 'foodapp.DetailFood',
			title: 'Chi tiết sản phẩm',
			passProps: {
				foodDTO
			},
			navigatorStyle,
			navigatorButtons: {
				rightButtons: [


					{
						title: 'Cart',
						id: 'cart',
						icon: iconsMap['ios-cart-outline']
					}
				]
			}
		});
	}

	_onRefresh() {
		this.setState({ isRefreshing: true });
		this._retrieveFoods('isRefreshed');
	}

	_onNavigatorEvent(event) {
		if (event.type === 'NavBarButtonPress') {
			if (event.id === 'cart') {
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
			}else if (event.id === 'create') {
				// let s = "Gửi thông tin cửa hàng";
				// let b = "Họ tên:\n Tên cửa hàng:\n Ngành nghề:\n Giới thiệu: \n SĐT: \n Đính kèm hình ảnh \n";
				// Linking.openURL('mailto:thienphuc0510@gmail.com?subject='+s+'&body='+b);
				this.props.navigator.push({
					screen: 'foodapp.Cart',
					title: 'Giỏ hàng',

					backButtonHidden: false,

				});
				//this.props.actions.addToCards(this.props.nowPlayingFoods[0]);
				// let rightButtons = [];
				// if (Platform.OS === 'ios') {
				// 	rightButtons = [
				// 		{
				// 			id: 'close',
				// 			title: 'Close',
				// 			icon: iconsMap['ios-close']
				// 		}
				// 	];
				// }
				// this.props.navigator.showModal({
				// 	screen: 'foodapp.CreatePost',
				// 	title: 'CreatePost',
				// 	navigatorButtons: {
				// 		rightButtons
				// 	}
				// });
			}
		}
	}
// listFeaturedFoods(){
// 	return {nowPlayingFoods.map((info) => (
// 		return (<CardOne key={info.id} info={info} viewFood={this._viewFood}/>);
// 	))};
// }
	render() {
		const { categories, nowPlayingFoods } = this.props;
		const iconPlay = <Icon name="md-play" size={21} color="#9F9F9F" style={{ paddingLeft: 3, width: 22 }} />;
		const iconTop = <Icon name="md-trending-up" size={21} color="#9F9F9F" style={{ width: 22 }} />;
		const iconUp = <Icon name="md-recording" size={21} color="#9F9F9F" style={{ width: 22 }} />;

		return (
			this.state.isLoading ? <View style={styles.progressBar}><ProgressBar /></View> :
			<ScrollView
				style={styles.container}
				refreshControl={
					<RefreshControl
						refreshing={this.state.isRefreshing}
						onRefresh={this._onRefresh}
						colors={['#EA0000']}
						tintColor="white"
						title="loading..."
						titleColor="white"
						progressBackgroundColor="white"
					/>
				}>
				<Swiper
					autoplay
					autoplayTimeout={4}
					showsPagination={false}
					height={248}>

					{nowPlayingFoods.map(info => (
							<CardOne key={info.id} info={info} viewFood={this._viewFood}/>))}

				</Swiper>
				<View>
				{categories.map(function(info) {
					var listByCat=[];
					nowPlayingFoods.map(function(e){
						//console.log ('categories.map',info);
						 if (e.categories.indexOf(info.name) !== -1){
							 listByCat.push(e);
						//	 console.log ('nowPlayingFoods.map',e);
						 }
					})
					return (<CardCategory key={info.id} info={info} listFoods={listByCat}
						viewFoodsList={context._viewFoodsList} viewFood={context._viewFood} />);
				})}

				<CardContact/>
				</View>
			</ScrollView>
		);
	}
}

Foods.propTypes = {
	actions: PropTypes.object.isRequired,
	categories: PropTypes.array.isRequired,
	nowPlayingFoods: PropTypes.array.isRequired,
	navigator: PropTypes.object
};

function mapStateToProps(state, ownProps) {
	return {
		categories: state.foods.categories,
		nowPlayingFoods: state.foods.nowPlayingFoods
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(foodsActions, dispatch)
	};
}

function ITEM(n, s, d, i, h ){
  this.NAME=n
  this.SOLUONG=s
  this.DONGIA=d
  this.IDSP=i
  this.HINH=h
}
export default connect(mapStateToProps, mapDispatchToProps)(Foods);
