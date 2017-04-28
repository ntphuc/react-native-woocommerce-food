import { combineReducers } from 'redux';
import foods from '../modules/foods/foods.reducer';

const rootReducer = combineReducers({
	foods
});

export default rootReducer;
