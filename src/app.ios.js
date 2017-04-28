/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { registerScreens } from './screens';

import { iconsMap, iconsLoaded } from './utils/AppIcons';
import configureStore from './store/configureStore';

const store = configureStore();

registerScreens(store, Provider);

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

class App extends Component {
	constructor(props) {
		super(props);
		iconsLoaded.then(() => {
			this.startApp();
		});
	}

	startApp() {
		Navigation.startTabBasedApp({
			tabs: [
				{
					label: 'Home',
					screen: 'foodapp.Foods',
					icon: iconsMap['ios-home-outline'],
					selectedIcon: iconsMap['ios-home'],
					title: 'Trang chủ',
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
				},
				{
					label: 'Search',
					screen: 'foodapp.Search',
					icon: iconsMap['ios-search-outline'],
					selectedIcon: iconsMap['ios-search'],
					title: 'Tìm kiếm',
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
				},
				{
					label: 'Contact',
					screen: 'foodapp.Contact',
					icon: iconsMap['ios-contact-outline'],
					selectedIcon: iconsMap['ios-contact'],
					title: 'Liên hệ',
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
				}
			],
			tabsStyle: {
				tabBarButtonColor: 'white',
				tabBarSelectedButtonColor: 'white',
				tabBarBackgroundColor: 'black'
			}
		});
	}
}

export default App;
