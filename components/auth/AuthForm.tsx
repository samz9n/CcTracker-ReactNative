import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import CustomButton from '../../util/CustomButton';
import Input from '../../util/Input';

interface AuthFormProps {
	isLogin: boolean;
	onSubmit: (
		credentials: {
			email: string;
			confirmEmail: string;
			password: string;
			confirmPassword: string;
		}
	) => void;
	credentialsInvalid: {
		email: boolean;
		confirmEmail: boolean;
		password: boolean;
		confirmPassword: boolean;
	};
}

export default function AuthForm(this: any, { isLogin, onSubmit, credentialsInvalid }: AuthFormProps) {
	const [ enteredEmail, setEnteredEmail ] = useState('');
	const [ enteredConfirmEmail, setEnteredConfirmEmail ] = useState('');
	const [ enteredPassword, setEnteredPassword ] = useState('');
	const [ enteredConfirmPassword, setEnteredConfirmPassword ] = useState('');

	const {
		email: emailIsInvalid,
		confirmEmail: emailsDontMatch,
		password: passwordIsInvalid,
		confirmPassword: passwordsDontMatch
	} = credentialsInvalid;

	function submitHandler() {
		onSubmit({
			email: enteredEmail,
			confirmEmail: enteredConfirmEmail,
			password: enteredPassword,
			confirmPassword: enteredConfirmPassword
		});
	}

	return (
		<View>
			<View>
				<Input
					label="Email Address"
					onUpdateValue={(prev: string) => setEnteredEmail(prev)}
					value={enteredEmail}
					keyboardType="email-address"
					isInvalid={emailIsInvalid}
				/>
				{!isLogin && (
					<Input
						label="Confirm Email Address"
						onUpdateValue={(prev: string) => setEnteredConfirmEmail(prev)}
						value={enteredConfirmEmail}
						keyboardType="email-address"
						isInvalid={emailsDontMatch}
					/>
				)}
				<Input
					label="Password"
					onUpdateValue={(prev: string) => setEnteredPassword(prev)}
					secure
					value={enteredPassword}
					isInvalid={passwordIsInvalid}
				/>
				{!isLogin && (
					<Input
						label="Confirm Password"
						onUpdateValue={(prev: string) => setEnteredConfirmPassword(prev)}
						secure
						value={enteredConfirmPassword}
						isInvalid={passwordsDontMatch}
					/>
				)}
				<View style={styles.buttons}>
					<CustomButton onPress={submitHandler}>{isLogin ? 'Log In' : 'Sign Up'}</CustomButton>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	buttons: {
		marginTop: 12
	}
});
