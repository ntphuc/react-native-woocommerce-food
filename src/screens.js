/* eslint-disable import/prefer-default-export */
import { Navigation } from 'react-native-navigation';

import Drawer from './modules/_global/Drawer';
import Foods from './modules/foods/Foods';
import FoodsList from './modules/foods/FoodsList';
import DetailFood from './modules/foods/DetailFood';
import Search from './modules/foods/Search';
import CreatePost from './modules/foods/CreatePost';
import Cart from './modules/foods/Cart';
import Contact from './modules/foods/Contact';
export function registerScreens(store, Provider) {
	Navigation.registerComponent('foodapp.DetailFood', () => DetailFood, store, Provider);
	Navigation.registerComponent('foodapp.Foods', () => Foods, store, Provider);
	Navigation.registerComponent('foodapp.FoodsList', () => FoodsList, store, Provider);
	Navigation.registerComponent('foodapp.Cart', () => Cart, store, Provider);
	Navigation.registerComponent('foodapp.Contact', () => Contact, store, Provider);
	Navigation.registerComponent('foodapp.Search', () => Search, store, Provider);
	Navigation.registerComponent('foodapp.CreatePost', () => CreatePost, store, Provider);
	Navigation.registerComponent('foodapp.Drawer', () => Drawer);
}
