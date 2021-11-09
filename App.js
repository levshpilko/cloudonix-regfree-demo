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

const LICENSE_KEY = 'someKey'; //add Sdk key

export default function App() {
	const [isStartCall, setIsStartCall] = useState(false);
	const [isEndCall, setIsEndCall] = useState(false);

	const callModeHandler = isCalling => {
		setIsStartCall(isCalling);
	};

	const hangUpHandler = isHangUp => {
		setIsEndCall(isHangUp);
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
				barStyle={!isStartCall ? 'dark-content' : 'light-content'}
				backgroundColor={!isStartCall ? '#fff' : '#212121'}
			/>
			{!isStartCall ? (
				<StartCall changeMode={callModeHandler} hangUp={hangUpHandler} />
			) : (
				<EndCall showMsg={isEndCall} />
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
