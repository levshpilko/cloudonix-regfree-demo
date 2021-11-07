import React from 'react';
import { View, StyleSheet, Button } from 'react-native';

export default function EndCall({ changeMode }) {
	const endCallHandler = () => {
		changeMode();
	};
	return (
		<View style={styles.callScreen}>
			<Button title='End Call' onPress={endCallHandler} color='red' />
		</View>
	);
}

const styles = StyleSheet.create({
	callScreen: {
		flex: 1,
		width: '100%',
		backgroundColor: '#212121',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
