import { View, Text, TextInput, StyleSheet } from 'react-native';

interface InputProps {
	label: string;
	keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
	secure?: boolean;
	onUpdateValue: (value: string) => void;
	value: string;
	isInvalid?: boolean;
}

export default function Input({ label, keyboardType, secure, onUpdateValue, value, isInvalid }: InputProps) {
	return (
		<View style={styles.inputContainer}>
			<Text style={[ styles.label, isInvalid && styles.labelInvalid ]}>{label}</Text>
			<TextInput
				style={[ styles.input, isInvalid && styles.inputInvalid ]}
				autoCapitalize={'none'}
				keyboardType={keyboardType}
				secureTextEntry={secure}
				onChangeText={onUpdateValue}
				value={value}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	inputContainer: {
		marginVertical: 8
	},
	label: {
		color: 'white',
		marginBottom: 4
	},
	labelInvalid: {
		color: '#ff8282'
	},
	input: {
		paddingVertical: 8,
		paddingHorizontal: 6,
		backgroundColor: '#bec2f9',
		borderRadius: 4,
		fontSize: 16
	},
	inputInvalid: {
		backgroundColor: '#ff8282'
	}
});
