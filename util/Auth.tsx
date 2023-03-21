/* Request logic for authentication via Firebase */
import axios from 'axios';

const API_KEY = 'AIzaSyBRuRGv4c6bZ0l1DHieH0YbS3yTr-6KbLU';

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
