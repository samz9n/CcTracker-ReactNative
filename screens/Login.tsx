import React, { useState, useContext } from 'react';
import { Alert } from 'react-native';
import AuthContent from '../components/auth/AuthContent';
import { loginUser } from '../util/auth';
import LoadingSign from '../components/ui/LoadingSign';
import { AuthContext } from '../store/auth-context';

export default function Login() {
	const [ isLoading, setIsLoading ] = useState(false);

	const authCtx = useContext(AuthContext);

	async function loginHandler({ email, password }: { email: string; password: string }) {
		setIsLoading(true);
		try {
			/* Logs the user in and returns a token. loginUser function comes from Auth.tsx */
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
