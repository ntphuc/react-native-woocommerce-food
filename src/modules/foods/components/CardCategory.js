import React, { PropTypes } from 'react';
import {
	Image,
	Text,
	TouchableOpacity,
	View,
	ScrollView
} from 'react-native';
import CardTwo from './CardTwo';
import styles from '../styles/Foods';
import * as foodsActions from '../foods.actions';
//const { nowPlayingFoods } = this.props;
const CardCategory = ({ info, listFoods, viewFoodsList, viewFood }) => (
	<View >
	<View style={styles.listHeading}>
		<Text style={styles.listHeadingLeft}>{info.name}</Text>
		<TouchableOpacity>
			<Text
				style={styles.listHeadingRight}
				onPress={viewFoodsList.bind(this, info, listFoods)}>
				Xem tất cả
			</Text>
		</TouchableOpacity>

	</View>
	<ScrollView style={{marginLeft:15}} horizontal showsHorizontalScrollIndicator={false}>
		{

			listFoods.map(info => (
			<CardTwo key={info.id} info={info} viewFood={viewFood} />
		))
	}
	</ScrollView>
	</View>
);

CardCategory.propTypes = {
	info: PropTypes.object.isRequired,
	viewFood: PropTypes.func.isRequired,
	viewFoodsList: PropTypes.func.isRequired,
	listFoods: PropTypes.array.isRequired
};


export default CardCategory;
