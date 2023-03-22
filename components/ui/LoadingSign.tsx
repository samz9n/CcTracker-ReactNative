import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

interface LoadingSignProps {
	message: string;
}

function LoadingSign({ message }: LoadingSignProps) {
	return (
		<View style={styles.rootContainer}>
			<Text style={styles.message}>{message}</Text>
			<ActivityIndicator size="large" />
		</View>
	);
}

export default LoadingSign;

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 32
	},
	message: {
		fontSize: 16,
		marginBottom: 12
	}
});
