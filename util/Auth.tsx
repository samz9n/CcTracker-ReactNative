/* Request logic for authentication via Firebase */
import axios from 'axios';
import { API_KEY } from './api-key';

async function authenticate(mode: string, email: string, password: string) {
	// Authenticate user
	const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
	const response = await axios.post(url, {
		email: email,
		password: password,
		returnSecureToken: true
	});
	/* Token comes from firebase with the name idToken */
	const token = response.data.idToken;
	return token;
}

function createUser(email: string, password: string) {
	// Create a user. Returns authenticate function (a promise with the token)
	return authenticate('signUp', email, password);
}

function loginUser(email: string, password: string) {
	// Login a user. Returns authenticate function (a promise with the token)
	return authenticate('signInWithPassword', email, password);
}

export { createUser, loginUser };
