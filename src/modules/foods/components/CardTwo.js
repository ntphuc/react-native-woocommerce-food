import React, { Component,PropTypes } from 'react';
import {
	Image,
	Text,
	TouchableOpacity,
	View
} from 'react-native';

import styles from './styles/CardTwo';
import { PRICE_UNIT } from '../../../constants/constants';

export default class CardTwo extends Component{
  render(){
		const { info, viewFood } = this.props;

    return(
			<TouchableOpacity activeOpacity={0.8} onPress={viewFood.bind(this, info)}>
				<View style={styles.cardContainer}>
					<Image source={{ uri: info.featured_src  }} style={styles.cardImage} />
					<View style={styles.cardTitleContainer}>
						<Text style={styles.cardTitle} numberOfLines={2}>{info.title}</Text>
						<Text style={styles.price}>{info.price+ PRICE_UNIT}</Text>
					</View>
				</View>
			</TouchableOpacity>
		)
	}
}

CardTwo.propTypes = {
	info: PropTypes.object.isRequired,
	viewFood: PropTypes.func.isRequired
};
