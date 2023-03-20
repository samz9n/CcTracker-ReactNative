import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TextButton from '../../util/TextButton';
import AuthForm from './AuthForm';

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

	function switchAuthModeHandler() {
		if (isLogin) {
			navigation.navigate('Signup');
		} else {
			navigation.navigate('Login');
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

		const emailIsValid = email.includes('@');
		const passwordIsValid = password.length > 6;
		const emailsAreEqual = email === confirmEmail;
		const passwordsAreEqual = password === confirmPassword;

		/* Checks if the entered credentials are valid */
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
		onAuthenticate({ email, password });
	}

	return (
		<View style={styles.authContent}>
			<AuthForm isLogin={isLogin} onSubmit={submitHandler} credentialsInvalid={credentialsInvalid} />
			<View style={styles.buttons}>
				<TextButton onPress={switchAuthModeHandler}>
					{isLogin ? 'Create a new user' : 'Log in instead'}
				</TextButton>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	authContent: {
		marginTop: 64,
		marginHorizontal: 32,
		padding: 16,
		borderRadius: 8,
		backgroundColor: '#520136',
		elevation: 2,
		shadowColor: 'black',
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.35,
		shadowRadius: 4
	},
	buttons: {
		marginTop: 8
	}
});
