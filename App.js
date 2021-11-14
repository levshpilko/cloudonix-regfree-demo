import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	SafeAreaView,
	StatusBar,
	NativeModules
} from 'react-native';

import EndCall from './components/EndCall';
import StartCall from './components/StartCall';

const { CxModule } = NativeModules;

const LICENSE_KEY = 'insert key here';

export default function App() {
	const [isStartCall, setIsStartCall] = useState(false); // boolean flag to track if a call was started
	const [isEndCall, setIsEndCall] = useState(false); // boolean flag to track if a call was ended

	// handeling the isStartCall state. gets a boolean
	const callModeHandler = isCalling => {
		setIsStartCall(isCalling);
	};

	// handeling the isEndCall state. gets a boolean
	const hangUpHandler = isHangUp => {
		setIsEndCall(isHangUp);
	};

	useEffect(() => {
		try {
			CxModule.initCloudonixSDK(LICENSE_KEY);
			CxModule.onLicense(() => {
				console.log('SDK initialized!');
			});
		} catch (err) {
			alert('Something went wrong. Please try again :(');
		}
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar
				barStyle={!isStartCall ? 'dark-content' : 'light-content'}
				backgroundColor={!isStartCall ? '#fff' : '#212121'}
			/>
			{!isStartCall ? (
				<StartCall changeMode={callModeHandler} hangUp={hangUpHandler} />
			) : (
				<EndCall showMsg={isEndCall} />
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});
