import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	SafeAreaView,
	StatusBar,
	View,
	NativeModules
} from 'react-native';

const { CxModule } = NativeModules;

import EndCall from './components/EndCall';
import StartCall from './components/StartCall';

const URL_CALL = 'http://192.168.1.200:3000/api/call';
const LICENSE_KEY = // insert key here

export default function App() {
	const [iscallMode, setIsCallMode] = useState(false);

	const callModeHandler = () => {
		setIsCallMode(prevIsCallMode => !prevIsCallMode);
	};

	useEffect(() => {
		CxModule.initCloudonixSDK(LICENSE_KEY);
		CxModule.onLicense(() => {
			console.log('initialized!!!');
		});
	}, []);

	return (
		<View style={styles.container}>
			<StatusBar
				barStyle={!iscallMode ? 'dark-content' : 'light-content'}
				backgroundColor={!iscallMode ? '#fff' : '#212121'}
			/>
			{!iscallMode ? (
				<StartCall changeMode={callModeHandler} />
			) : (
				<EndCall changeMode={callModeHandler} />
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});
