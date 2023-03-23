import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

interface CoinListButtonProps {
	onPress: () => void;
	symbol: string;
	name: string;
	price: number;
	priceChange: number;
	image: string;
}

export default function CoinListButton({ onPress, symbol, name, price, priceChange, image }: CoinListButtonProps) {
	return (
		<View style={styles.buttonContainer}>
			<Pressable
				onPress={onPress}
				style={({ pressed }) => {
					return [
						{
							backgroundColor: pressed ? 'rgb(60, 49, 70)' : 'rgb(13, 0, 24)'
						}
					];
				}}
			>
				<View style={styles.button}>
					<View>
						<Image source={{ uri: image }} style={{ width: 30, height: 30 }} />
					</View>
					<View style={styles.textAndPriceContainer}>
						<View style={styles.textAndPrice}>
							<Text>{symbol}</Text>
							<Text>{price}</Text>
						</View>
						<View style={styles.textAndPrice}>
							<Text>{name}</Text>
							<Text>{priceChange}</Text>
						</View>
					</View>
				</View>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	buttonContainer: {
		backgroundColor: 'rgb(13, 0, 24)',
		height: 200,
		width: '100%'
	},
	button: {},
	textAndPriceContainer: {
		flexDirection: 'row'
	},
	textAndPrice: {
		justifyContent: 'space-between'
	}
});
