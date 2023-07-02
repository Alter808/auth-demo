import { useContext, useState } from 'react'
import AuthContent from '../components/Auth/AuthContent'
import { authenticate } from '../util/auth'
import LoadingOverlay from '../components/ui/LoadingOverlay'
import { Alert } from 'react-native'
import { AuthContext } from '../store/auth-context'

const LoginScreen = () => {
	//LoginScreen function
	const [isAuthenticating, setIsAuthenticating] = useState(false)

	const authCtx = useContext(AuthContext)

	const signInHandler = async ({ email, password }) => {
		setIsAuthenticating(true)
		try {
			const token = await authenticate('signInWithPassword', email, password)
			authCtx.authenticate(token)
		} catch (error) {
			console.log(error)
			Alert.alert(
				'Authentication Error',
				'Could not log you in check credentials'
			)
		}

		setIsAuthenticating(false)
	}

	if (isAuthenticating) {
		return <LoadingOverlay message='creating user' />
	}

	return <AuthContent isLogin onAuthenticate={signInHandler} />
}

export default LoginScreen
