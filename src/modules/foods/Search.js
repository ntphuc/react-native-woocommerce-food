import React, { PropTypes, Component } from 'react';
import {
	View,
	ListView,
	TextInput
} from 'react-native';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { WEB_URL  } from '../../constants/api';
import * as foodsActions from './foods.actions';
import CardThree from './components/CardThree';
import styles from './styles/Search';
import { iconsMap } from '../../utils/AppIcons';
var isEnd=false;
class Search extends Component {
	constructor(props) {
		super(props);
		const ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });
	//	const dataSource = ds.cloneWithRows(nextProps.searchResults);

		this.state = {
			isLoading: true,
			currentPage: 1,
			dataSource: ds.cloneWithRows(['row 1', 'row 2']),
			query: null
		};

		this._viewFood = this._viewFood.bind(this);
		this._handleTextInput = this._handleTextInput.bind(this);
		this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
	}

	_handleTextInput(event) {
		const query = event.nativeEvent.text;
		this.setState({ query });
		if (!query) this.setState({ query: '' });

		setTimeout(() => {
			if (query.length) {
				this.props.actions.retrieveFoodsSearchResults(this.state.query, 1);

			}
		}, 500);
	}

	componentWillReceiveProps(nextProps) {

			// const ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });
			// const dataSource = ds.cloneWithRows(nextProps.searchResults);
			this.setState({
				dataSource:this.state.dataSource.cloneWithRows(nextProps.searchResults),
				isLoading: false
			});

	}
	_retrieveNextPage() {
		if (!isEnd) {
			this.setState({
				currentPage: this.state.currentPage + 1
			});

			let page;
			if (this.state.currentPage === 1) {
				page = 2;
				this.setState({ currentPage: 2 });
			} else {
				page = this.state.currentPage + 1;
			}
			fetch(WEB_URL+"/products?page="+page+"&filter[q]="+this.state.query)
				.then((response) => response.json())
				.then((responseData) => {
						//console.log("nowplaying data", responseData);
						const data = this.state.dataSource;
						const newData = responseData;
						if (newData.length==0)
							isEnd=true;
						newData.map((item, index) => data.push(item));

						this.setState({
							dataSource: this.state.dataSource.cloneWithRows(data)});
					});

		}
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

	_renderListView() {
		let listView;
		if (this.state.query && this.state.dataSource!=0 ) {
			listView = (
				<ListView
					enableEmptySections

					dataSource={this.state.dataSource}
					renderRow={rowData => <CardThree info={rowData} viewFood={this._viewFood} />}
					renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.seperator} />}
				/>
			);
		} else {
			listView = <View />;
		}

		return listView;
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.searchbox}>
					<View style={styles.searchboxBorder}>
						<TextInput
							style={styles.textInput}
							returnKeyType={'search'}
							value={this.state.query}
							onChange={this._handleTextInput}
							underlineColorAndroid="transparent"
						/>
					</View>
				</View>
				{ !this.state.isLoading && this._renderListView() }
			</View>

		);
	}
}

Search.propTypes = {
	actions: PropTypes.object.isRequired,
	searchResults: PropTypes.array.isRequired,
	navigator: PropTypes.object
};

Search.navigatorStyle = {
	statusBarColor: 'black',
	statusBarTextColorScheme: 'light',
	navBarBackgroundColor: '#0a0a0a',
	navBarTextColor: 'white',
	navBarButtonColor: 'white'
};

function mapStateToProps(state, ownProps) {
	return {
		searchResults: state.foods.searchResults
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(foodsActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
