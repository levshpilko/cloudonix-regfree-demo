import React, { useEffect } from 'react';
import {
	Text,
	StyleSheet,
	Button,
	SafeAreaView,
	NativeModules
} from 'react-native';

const { CxModule } = NativeModules;

import axios from 'axios';

const URL_CALL = 'url/api/call'; //Add Your sever url

export default function StartCall({ changeMode, hangUp }) {
	useEffect(() => {
		hangUp(false);
	}, []);

	const callHandler = async () => {
		try {
			let res = await axios.get(URL_CALL);
			console.log(res.data);
			changeMode(true);
			CxModule.dial(res.data.msisdn, res.data.callToken, () => {
				hangUp(true);
				setTimeout(() => {
					changeMode(false);
				}, 1500);
			});
		} catch (err) {
			console.log(err.response.data.message);
		}
	};

	return (
		<SafeAreaView style={styles.callScreen}>
			<Text style={styles.txt}>Welcome to Cloudonix reg-free demo app</Text>
			<Button title='Make A Call' onPress={callHandler} color='green' />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	callScreen: {
		flex: 1,
		width: '100%',
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	txt: {
		paddingBottom: 10
	}
});
