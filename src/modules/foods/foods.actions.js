
import {AsyncStorage} from "react-native";
import * as types from '../../constants/actionTypes';
import { TMDB_URL, TMDB_API_KEY, WEB_URL, GET_POSTS } from '../../constants/api';
import axios from 'axios';


 async function getItem(item) {
		try {
			const value = await AsyncStorage.getItem(item);
			console.log("hehe",value);
			return value;
		} catch (error) {
			// Handle errors here
		}
}

async function setItem(item, mang) {
	try{
		await AsyncStorage.setItem(item, JSON.stringify(mang))
	}catch(e){
		console.log(e);
	}
}

export function addToCardsSuccess(res) {
	return {
		type: types.ADD_TO_CARDS_SUCCESS,
		cards: res
	};
}

export function addToCards(foodDTO) {
	return function (dispatch) {
		try{

		//	console.log("foodDTO",foodDTO);
				//var v =  dispatch(getItem("@CARDS:key"));
				var v;
				async () => {
					 try {
						 v = await AsyncStorage.getItem("@CARDS:key");
						 var mang=[];

				 		if (v==null || v.getRowCount()==0){
				 console.log("is null",v);
				 			foodDTO["soluong"]=0;
				 			mang.push(foodDTO);
				 		}else{
				 		console.log("has phan tu",v);
				 				var isExist=false;
				 					mang = JSON.parse(v);
				 				mang.map(function(e){
				 					if (e.id==foodDTO.id){
				 						e["soluong"]=e["soluong"]+1;
				 						isExist=true;
				 					}
				 				});
				 				if (!isExist){
				 					foodDTO["soluong"]=0;
				 					mang.push(foodDTO);
				 				}

				 		}
						async (mang) => {
							 try {
								 await AsyncStorage.setItem("@CARDS:key",mang);
								 console.log("mang return ",mang);
												dispatch(addToCardsSuccess(mang));
							 } catch (error) {
								 // Handle errors here
							 }
						};
					 } catch (error) {
						 // Handle errors here
					 }
				};


				//dispatch(setItem("@CARDS:key",JSON.stringify(mang)));

				// AsyncStorage.setItem('@CARDS2:key', JSON.stringify(mang));

			}
			catch (error){
					console.log("test cards error",error);
			}


	};
}





// GET CATEGORIES
export function retrieveCategoriesSuccess(res) {
	return {
		type: types.RETRIEVE_CATEGORIES_SUCCESS,
		categories: res
	};
}

export function retrieveCategories() {


	return function (dispatch) {
		//console.log("url", 'http://harborcity.top/sfood/wp-json/wp/v2/categories');

		fetch(WEB_URL+"/products/categories")
			.then((response) => response.json())
			.then((responseData) => {
					//console.log("categories data", responseData);
    			dispatch(retrieveCategoriesSuccess(responseData));
				});

	};
}
// NOW PLAYING
export function retrieveNowPlayingFoodsSuccess(res) {
	return {
		type: types.RETRIEVE_NOWPLAYING_FOODS_SUCCESS,
		nowPlayingFoods: res
	};
}

export function retrieveNowPlayingFoods(page) {


	return function (dispatch) {
		//console.log("url", 'http://harborcity.top/sfood/wp-json/wp/v2/posts');
		fetch(WEB_URL+"/products")
			.then((response) => response.json())
			.then((responseData) => {
					//console.log("nowplaying data", responseData);
    			dispatch(retrieveNowPlayingFoodsSuccess(responseData));
				});

	};
}



// SEARCH RESULTS
export function retrieveFoodsSearchResultsSuccess(res) {
	return {
		type: types.RETRIEVE_FOODS_SEARCH_RESULT_SUCCESS,
		searchResults: res
	};
}

export function retrieveFoodsSearchResults(query, page) {
  return function (dispatch) {
		//console.log("url", 'http://harborcity.top/sfood/wp-json/wp/v2/posts');
		fetch(WEB_URL+"/products?page="+page+"&filter[q]="+query)
			.then((response) => response.json())
			.then((responseData) => {
					//console.log("nowplaying data", responseData);
    			dispatch(retrieveFoodsSearchResultsSuccess(responseData));
				});

	};
}
