import React, {Component, PropTypes } from 'react';
import {
	Image,
	Text,
	TouchableOpacity,
	View,
	Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles/CardOne';

const iconStar = (<Icon name="md-star" size={16} color="#F5B642" />);

export default class CardContact extends Component{
	call (){
		Linking.openURL('tel:0969007688');
	}
	gotoWeb (){
		Linking.openURL('google.com.vn').catch(err => console.error('An error occurred', err));
	}
	email (){

		Linking.openURL('mailto:thienphuc0510@gmail.com').catch(err => console.error('An error occurred', err));
	}
  render(){
		//const { info, viewFood } = this.props;

    return(
			<View style={{backgroundColor:'rgba(52, 52, 52, 0.8)'}}>
				<Image source={{ uri:'http://garotasnerds.com/wp-content/uploads/2013/09/the-fast-food-boulevard-is-already-bustling-with-fans-it-consists-of-a-row-of-fast-service-counters-and-one-large-seating-area-for-all-of-the-eateries.jpg' }} style={styles.imageBackdrop} />
				<LinearGradient colors={['rgba(0, 0, 0, 0.5)', 'rgba(0,0,0, 0.7)', 'rgba(0,0,0, 0.8)']} style={styles.linearGradient} />
				<View style={styles.cardContainer}>
					<Image source={{ uri:'https://brasol.vn/wp-content/uploads/2016/01/brasol-thiet-ke-logo-vietsub-12.jpg' }} style={styles.cardImage} />
					<View style={styles.cardDetails}>
						<Text style={styles.cardTitle} numberOfLines={2}>
							Quán ăn Việt Sub
						</Text>
						<View style={styles.cardGenre}>
							<Text style={styles.cardGenreItem}>Ăn là nhớ, Ăn là ghiền</Text>
						</View>
						<View style={styles.cardNumbers}>
							<View style={styles.cardStar}>
								{iconStar}
								<Text style={styles.cardStarRatings}>9.0</Text>
							</View>
							<Text style={styles.cardRunningHours} />
						</View>
						<Text style={styles.cardDescription} numberOfLines={3}>
							22 Lý Thái Tổ, P10, Q10, TPHCM
						</Text>
						<TouchableOpacity activeOpacity={0.9} onPress={()=>this.gotoWeb()}>
							<Text style={styles.cardDescription} numberOfLines={3}>
								Website: google.com.vn
							</Text>
						</TouchableOpacity>
						<TouchableOpacity activeOpacity={0.9} onPress={()=>this.email()}>
						<Text style={styles.cardDescription} numberOfLines={3}>
							Email: thienphuc0510@gmail.com
						</Text>
						</TouchableOpacity>
						<TouchableOpacity activeOpacity={0.9} onPress={()=>this.call()}>
							<View style={styles.viewButton}>
								<Text style={styles.viewButtonText}>0906096096</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</View>
    );
  }
}
