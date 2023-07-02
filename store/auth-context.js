import { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AuthContext = createContext({
	token: '',
	isAuthenticated: false,
	authenticate: (token) => {},
	logout: () => {},
})

const AuthContextProvider = ({ children }) => {
	const [authToken, setAuthToken] = useState()

	const authenticate = async (token) => {
		setAuthToken(token)
		try {
			await AsyncStorage.setItem('token', token)
		} catch (error) {
			console.log(error)
		}
	}
	const logout = () => {
		setAuthToken(null)
	}

	const value = {
		token: authToken,
		isAuthenticated: !!authToken,
		authenticate: authenticate,
		logout: logout,
	}
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export { AuthContext }

export default AuthContextProvider
