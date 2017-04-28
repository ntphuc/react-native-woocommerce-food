import React, {Component, PropTypes } from 'react';
import {
	Image,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles/CardOne';

const iconStar = (<Icon name="md-star" size={16} color="#F5B642" />);

export default class CardOne extends Component{
  render(){
		const { info, viewFood } = this.props;

		// if (info.better_featured_image!=null)
		// 	image_url = info.better_featured_image.media_details.sizes.thumbnail.source_url ;

			// try {
			//     image_url = info.better_featured_image.media_details.sizes.thumbnail.source_url ;
			// }
			// catch(err) {
			//
			// }
			var cat = info.categories.map(c=>(c+"   "));
    return(
			<View>
				<Image source={{ uri:info.featured_src }} style={styles.imageBackdrop} />
				<LinearGradient colors={['rgba(0, 0, 0, 0.5)', 'rgba(0,0,0, 0.7)', 'rgba(0,0,0, 0.8)']} style={styles.linearGradient} />
				<View style={styles.cardContainer}>
					<Image source={{ uri:info.featured_src }} style={styles.cardImage} />
					<View style={styles.cardDetails}>
						<Text style={styles.cardTitle} numberOfLines={2}>
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
							<Text style={styles.cardRunningHours} />
						</View>
						<Text style={styles.cardDescription} numberOfLines={3}>
							{info.description.replace(/<\/?[^>]+(>|$)/g, "")}
						</Text>
						<TouchableOpacity activeOpacity={0.9} onPress={viewFood.bind(this, info)}>
							<View style={styles.viewButton}>
								<Text style={styles.viewButtonText}>Xem chi tiết</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</View>
    );
  }
}
// const CardOne = ({ info, viewFood }) => (
// 	<View>
// 		<Image source={{ uri:`${(info.better_featured_image.media_details.sizes.thumbnail.source_url || image_url  )}` }} style={styles.imageBackdrop} />
// 		<LinearGradient colors={['rgba(0, 0, 0, 0.5)', 'rgba(0,0,0, 0.7)', 'rgba(0,0,0, 0.8)']} style={styles.linearGradient} />
// 		<View style={styles.cardContainer}>
// 			<Image source={{ uri:`${(info.better_featured_image.media_details.sizes.thumbnail.source_url || image_url  )}`}} style={styles.cardImage} />
// 			<View style={styles.cardDetails}>
// 				<Text style={styles.cardTitle} numberOfLines={2}>
// 					{info.title.rendered}
// 				</Text>
// 				<View style={styles.cardGenre}>
// 					<Text style={styles.cardGenreItem}>Action</Text>
// 				</View>
// 				<View style={styles.cardNumbers}>
// 					<View style={styles.cardStar}>
// 						{iconStar}
// 						<Text style={styles.cardStarRatings}>8.9</Text>
// 					</View>
// 					<Text style={styles.cardRunningHours} />
// 				</View>
// 				<Text style={styles.cardDescription} numberOfLines={3}>
// 					{info.content.rendered}
// 				</Text>
// 				<TouchableOpacity activeOpacity={0.9} onPress={viewFood.bind(this, info.id)}>
// 					<View style={styles.viewButton}>
// 						<Text style={styles.viewButtonText}>View Details</Text>
// 					</View>
// 				</TouchableOpacity>
// 			</View>
// 		</View>
// 	</View>
// );

CardOne.propTypes = {
	info: PropTypes.object.isRequired,
	viewFood: PropTypes.func.isRequired
};

//export default CardOne;
