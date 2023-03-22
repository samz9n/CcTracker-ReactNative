import { useState } from 'react';
import { Alert, ImageBackground, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TextButton from '../ui/TextButton';
import AuthForm from './AuthForm';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface AuthContentProps {
	isLogin: boolean;
	onAuthenticate: (credentials: { email: string; password: string }) => void;
}

export default function AuthContent({ isLogin, onAuthenticate }: AuthContentProps) {
	const navigation: any = useNavigation();
	const [ credentialsInvalid, setCredentialsInvalid ] = useState({
		email: false,
		password: false,
		confirmEmail: false,
		confirmPassword: false
	});
	/* Navigates to the right screen depending on if you want to login or signup */
	function switchAuthModeHandler() {
		if (isLogin) {
			navigation.replace('Signup');
		} else {
			navigation.replace('Login');
		}
	}

	function submitHandler(credentials: {
		email: string;
		confirmEmail: string;
		password: string;
		confirmPassword: string;
	}) {
		let { email, confirmEmail, password, confirmPassword } = credentials;

		email = email.trim();
		password = password.trim();
		/* Validation of credentials. Firebase requires password to be at least 6 characters long. */
		const emailIsValid = email.includes('@') && email.includes('.');
		const passwordIsValid = password.length > 6;
		const emailsAreEqual = email === confirmEmail;
		const passwordsAreEqual = password === confirmPassword;

		/* Checks if the entered credentials are valid. If invalid, alerts the user and returns. */
		if (!emailIsValid || !passwordIsValid || (!isLogin && (!emailsAreEqual || !passwordsAreEqual))) {
			Alert.alert('Invalid input', 'Please check your entered credentials.');
			setCredentialsInvalid({
				email: !emailIsValid,
				confirmEmail: !emailIsValid || !emailsAreEqual,
				password: !passwordIsValid,
				confirmPassword: !passwordIsValid || !passwordsAreEqual
			});
			return;
		}
		/* When email and password are valid, the onAuthenticate function is called, 
		and the values can be sent to backend via signup or login component. */
		onAuthenticate({ email, password });
	}

	return (
		<View style={styles.container}>
			<ImageBackground
				style={styles.container}
				source={require('../../assets/images/ScatteredCryptos.png')}
				resizeMode="cover"
			>
				<KeyboardAwareScrollView>
					<View style={styles.authContent}>
						<AuthForm isLogin={isLogin} onSubmit={submitHandler} credentialsInvalid={credentialsInvalid} />
						<View style={styles.buttons}>
							<TextButton onPress={switchAuthModeHandler}>
								{isLogin ? 'Create a new user' : 'Log in instead'}
							</TextButton>
						</View>
					</View>
				</KeyboardAwareScrollView>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	authContent: {
		marginTop: 48,
		marginHorizontal: 32,
		padding: 16,
		borderRadius: 8,
		backgroundColor: 'rgba(63, 0, 44, 0.98)',
		elevation: 8,
		shadowColor: 'black',
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.8,
		shadowRadius: 4
	},
	buttons: {
		marginTop: 8
	}
});
