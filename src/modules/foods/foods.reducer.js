import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function (state = initialState.foods, action) {
	switch (action.type) {
		case types.RETRIEVE_CATEGORIES_SUCCESS:
			return {
				...state,
				categories: action.categories
			};

		case types.ADD_TO_CARDS_SUCCESS:
				return {
					...state,
					cards: action.cards
				};
		case types.RETRIEVE_NOWPLAYING_FOODS_SUCCESS:
			return {
				...state,
				nowPlayingFoods: action.nowPlayingFoods
			};


		case types.RETRIEVE_FOODS_SEARCH_RESULT_SUCCESS:
			return {
				...state,
				searchResults: action.searchResults
			};
		default:
			return state;
	}
}
