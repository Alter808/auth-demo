import { useContext, useState } from 'react'
import AuthContent from '../components/Auth/AuthContent'
import { authenticate } from '../util/auth'
import LoadingOverlay from '../components/ui/LoadingOverlay'
import { Alert } from 'react-native'
import { AuthContext } from '../store/auth-context'

const SignupScreen = () => {
	//SignupScreen function start
	const [isAuthenticating, setIsAuthenticating] = useState(false)

	const authCtx = useContext(AuthContext)

	const signupHandler = async ({ email, password }) => {
		setIsAuthenticating(true)
		try {
			const token = await authenticate('signUp', email, password)
			authCtx.authenticate(token)
		} catch (error) {
			Alert.alert('Error', 'could not Sign you up try later.')
		}
		setIsAuthenticating(false)
	}

	if (isAuthenticating) {
		return <LoadingOverlay message='creating user' />
	}

	return <AuthContent onAuthenticate={signupHandler} />
}

export default SignupScreen
