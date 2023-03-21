import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import AuthContent from '../components/auth/AuthContent';
import { createUser } from '../util/Auth';
import LoadingSign from '../util/LoadingSign';

export default function Signup() {
	const [ isLoading, setIsLoading ] = useState(false);

	async function signupHandler({ email, password }: { email: string; password: string }) {
		setIsLoading(true);
		await createUser(email, password);
		setIsLoading(false);
	}
	/* Shows a loadingspinner while the user is being created */
	if (isLoading) return <LoadingSign message="Creating user..." />;

	return <AuthContent onAuthenticate={signupHandler} isLogin={false} />;
}
