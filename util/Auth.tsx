/* Request logic for authentication via Firebase */
import axios from 'axios';

const API_KEY = 'AIzaSyBRuRGv4c6bZ0l1DHieH0YbS3yTr-6KbLU';

async function createUser(email: string, password: string) {
	// Create a user
	try {
		const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_KEY, {
			email: email,
			password: password,
			returnSecureToken: true
		});
	} catch (error) {
		console.log(error);
	}
}
export { createUser };
