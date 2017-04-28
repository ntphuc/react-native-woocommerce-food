/* eslint-disable new-cap */
import React, { PropTypes, Component } from 'react';
import {
	Image,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import styles from './styles/CardThree';

const iconStar = <Icon name="md-star" size={16} color="#F5B642" />;

export default class CardThree extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		const { info, viewFood } = this.props;
		console.log('card three', info);
		var cat = info.categories.map(c=>(c+"   "));
		//cat= cat.slice(0,-1);
		return (
			<View style={styles.cardContainer}>
				<TouchableOpacity activeOpacity={0.9} onPress={viewFood.bind(this, info)}>
					<View style={styles.card}>
						<Image source={{ uri: info.featured_src}} style={styles.cardImage} />
						<View style={styles.cardDetails}>
							<Text
								style={styles.cardTitle}
								numberOfLines={3}>
								{info.title}
							</Text>
							<View style={styles.cardGenre}>
								<Text style={styles.cardGenreItem}>{cat}</Text>
							</View>
							<View style={styles.cardNumbers}>
								<View style={styles.cardStar}>
									{iconStar}
									<Text style={styles.cardStarRatings}>{info.average_rating}</Text>
								</View>
							</View>
							<Text style={styles.cardDescription} numberOfLines={3}>
								{info.description.replace(/<\/?[^>]+(>|$)/g, "")}
							</Text>
						</View>
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}

CardThree.propTypes = {
	info: PropTypes.object.isRequired,
	viewFood: PropTypes.func.isRequired
};
