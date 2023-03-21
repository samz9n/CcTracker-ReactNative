import React, { useState, useContext } from 'react';
import { Alert } from 'react-native';
import AuthContent from '../components/auth/AuthContent';
import { loginUser } from '../util/Auth';
import LoadingSign from '../util/LoadingSign';
import { AuthContext } from '../store/auth-context';

export default function Login() {
	const [ isLoading, setIsLoading ] = useState(false);

	const authCtx = useContext(AuthContext);

	async function loginHandler({ email, password }: { email: string; password: string }) {
		setIsLoading(true);
		try {
			const token = await loginUser(email, password);
			authCtx.authenticate(token);
		} catch (error) {
			Alert.alert('Error', 'Invalid credentials. Please try again.');
		}
		setIsLoading(false);
	}
	/* Shows a loadingspinner while the user is being created */
	if (isLoading) return <LoadingSign message="Logging in..." />;

	return <AuthContent isLogin onAuthenticate={loginHandler} />;
}
