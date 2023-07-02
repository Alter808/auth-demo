import axios from 'axios'

const API_KEY = 'AIzaSyChAasjncsMe1uJWuwSq7JnHmFV-kS3pCQ'

const authenticate = async (mode, email, password) => {
	const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`
	const response = await axios.post(url, {
		email: email,
		password: password,
		returnSecureToken: true,
	})

	const token = response.data.idToken
	return token
}

export { authenticate }
