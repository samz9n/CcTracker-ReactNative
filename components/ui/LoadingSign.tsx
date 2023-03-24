import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

interface LoadingSignProps {
	message: string;
}

export default function LoadingSign({ message }: LoadingSignProps) {
	return (
		<View style={styles.rootContainer}>
			<Text style={styles.message}>{message}</Text>
			<ActivityIndicator size="large" color="white" />
		</View>
	);
}

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 32,
		backgroundColor: 'rgb(13, 0, 24)'
	},
	message: {
		fontSize: 16,
		marginBottom: 12,
		color: 'white'
	}
});
