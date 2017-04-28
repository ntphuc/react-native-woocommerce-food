import React, { PropTypes, Component } from 'react';
import {
	Platform,
	View,
	ListView,
	RefreshControl,
	Text,
	ScrollView
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { TMDB_URL, TMDB_API_KEY } from '../../constants/api';
import * as foodsActions from './foods.actions';
import CardThree from './components/CardThree';
import CardTwo from './components/CardTwo';
import ProgressBar from '../_global/ProgressBar';
import styles from './styles/FoodsList';
import { iconsMap } from '../../utils/AppIcons';

class FoodsList extends Component {
	constructor(props) {
		super(props);


		// this.state = {
		// 		dataSource: ds.cloneWithRows([]),
		// };

		this._viewFood = this._viewFood.bind(this);
		this._onRefresh = this._onRefresh.bind(this);
		this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
	}





	_viewFood(foodDTO) {
		this.props.navigator.push({
			screen: 'foodapp.DetailFood',
			title: 'Chi tiết sản phẩm',
			passProps: {
				foodDTO
			},
			backButtonHidden: false,

		});
	}
	componentWillMount() {

		const ds = new ListView.DataSource({
				rowHasChanged: (r1, r2) => r1 !== r2
		});
		console.log("list by cat",this.props.listByCat);
			this.setState({
					dataSource: ds.cloneWithRows(this.props.listByCat)
			});
	}
	_onRefresh() {
		this.setState({ isRefreshing: true });
	}

	_onNavigatorEvent(event) {
		if (event.type === 'NavBarButtonPress') {
			if (event.id === 'close') {
				this.props.navigator.dismissModal();
			}
		}
	}

	render() {

		const {info,listByCat, categories, nowPlayingFoods}=this.props;
		return (
		<View style={styles.container}>
		<ListView
				style={styles.listview}
				enableEmptySections
				dataSource={this.state.dataSource}
				renderRow={rowData => <CardThree info={rowData} viewFood={this._viewFood} />}
				renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.seperator} />}
				/>

			</View>
		);
	}
}

FoodsList.propTypes = {
	actions: PropTypes.object.isRequired,
	info: PropTypes.object.isRequired,
	listByCat: PropTypes.array.isRequired,
	navigator: PropTypes.object
};

let navigatorStyle = {};

if (Platform.OS === 'ios') {
	navigatorStyle = {
		navBarTranslucent: true,
		drawUnderNavBar: true
	};
} else {
	navigatorStyle = {
		navBarBackgroundColor: '#0a0a0a'
	};
}

FoodsList.navigatorStyle = {
	...navigatorStyle,
	statusBarColor: 'black',
	statusBarTextColorScheme: 'light',
	navBarTextColor: 'white',
	navBarButtonColor: 'white'
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

export default connect(mapStateToProps, mapDispatchToProps)(FoodsList);

// <ScrollView
// 	style={styles.listview}>
//
//
// {nowPlayingFoods.map(info => (
// 		<CardThree info={info} viewFood={this._viewFood} />))}
// 	</ScrollView>
