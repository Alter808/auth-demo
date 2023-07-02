import { StyleSheet, Text, View } from 'react-native'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../store/auth-context'

const WelcomeScreen = () => {
	const [fetchedMessage, setFetchedMessage] = useState('')
	const auxCtx = useContext(AuthContext)
	useEffect(() => {
		const getMessage = async () => {
			const response = await axios.get(
				`https://expense-app-99291-default-rtdb.firebaseio.com/message.json?auth=${auxCtx.token}`
			)
			setFetchedMessage(response.data)
		}
		getMessage()
	}, [auxCtx.token])
	return (
		<View style={styles.rootContainer}>
			<Text style={styles.title}>Welcome!</Text>
			<Text>You authenticated successfully!</Text>
			<Text>{fetchedMessage}</Text>
		</View>
	)
}

export default WelcomeScreen

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 32,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 8,
	},
})
