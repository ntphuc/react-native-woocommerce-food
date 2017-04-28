import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'black',
		paddingTop: 64,
		marginBottom:55
	},
	headerTitle: {
		backgroundColor: '#000000',
		flex: 1
	},
	textTitle: {
		color: '#ffffff',
		flex: 1
	},
	listview: {
		backgroundColor: '#0a0a0a',
		flex: 9
	},
	progressBar: {
		backgroundColor: '#0a0a0a',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	seperator: {
		marginTop: 10,
		backgroundColor: '#8E8E8E'
	}
});

export default styles;
