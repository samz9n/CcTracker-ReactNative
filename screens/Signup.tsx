import React, { useContext, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import AuthContent from '../components/auth/AuthContent';
import { createUser } from '../util/Auth';
import LoadingSign from '../util/LoadingSign';
import { AuthContext } from '../store/auth-context';

export default function Signup() {
	const [ isLoading, setIsLoading ] = useState(false);

	const authCtx = useContext(AuthContext);

	async function signupHandler({ email, password }: { email: string; password: string }) {
		setIsLoading(true);
		try {
			/* Creates a user and returns a token. createUser function comes from Auth.tsx */
			const token = await createUser(email, password);
			authCtx.authenticate(token);
		} catch (error) {
			Alert.alert('Signup failed', 'Please try again later.');
		}
		setIsLoading(false);
	}
	/* Shows a loadingspinner while the user is being created */
	if (isLoading) return <LoadingSign message="Creating user..." />;

	return <AuthContent onAuthenticate={signupHandler} isLogin={false} />;
}
