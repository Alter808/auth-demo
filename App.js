import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import { useContext, useEffect, useState, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen'
import WelcomeScreen from './screens/WelcomeScreen'
import { Colors } from './constants/styles'
import AuthContextProvider, { AuthContext } from './store/auth-context'
import IconButton from './components/ui/IconButton'
import LoadingOverlay from './components/ui/LoadingOverlay'

const Stack = createNativeStackNavigator()

function AuthStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: Colors.primary500 },
				headerTintColor: 'white',
				contentStyle: { backgroundColor: Colors.primary100 },
			}}
		>
			<Stack.Screen name='Login' component={LoginScreen} />
			<Stack.Screen name='Signup' component={SignupScreen} />
		</Stack.Navigator>
	)
}

function AuthenticatedStack() {
	const authCtx = useContext(AuthContext)
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: Colors.primary500 },
				headerTintColor: 'white',
				contentStyle: { backgroundColor: Colors.primary100 },
			}}
		>
			<Stack.Screen
				name='Welcome'
				component={WelcomeScreen}
				options={{
					headerRight: ({ tintColor }) => (
						<IconButton
							icon='exit'
							color={tintColor}
							size={24}
							onPress={authCtx.logout}
						/>
					),
				}}
			/>
		</Stack.Navigator>
	)
}

function Navigation() {
	const authCtx = useContext(AuthContext)

	return (
		<NavigationContainer>
			{!authCtx.isAuthenticated && <AuthStack />}
			{authCtx.isAuthenticated && <AuthenticatedStack />}
		</NavigationContainer>
	)
}

const Root = () => {
	const [appIsReady, setAppIsReady] = useState(false)
	const authCtx = useContext(AuthContext)
	useEffect(() => {
		const fetchStoredToken = async () => {
			const storedToken = await AsyncStorage.getItem('token')

			if (storedToken) {
				authCtx.authenticate(storedToken)
			}
			setAppIsReady(true)
		}
		fetchStoredToken()
	}, [])

	if (!appIsReady) {
		return <LoadingOverlay message='Starting App' />
	}
	return <Navigation />
}

export default function App() {
	return (
		<>
			<StatusBar style='light' />
			<AuthContextProvider>
				<Root />
			</AuthContextProvider>
		</>
	)
}
