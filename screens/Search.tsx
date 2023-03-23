import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { fetchTop100 } from '../util/cryptoRest';

interface Coin {
	id: string;
	name: string;
	symbol: string;
	price: number;
	priceChange: number;
	image: string;
}

export default function Search() {
	const [ top100, setTop100 ] = useState<Coin[]>([]);
	/* We fetch the top 100 coins and set them to state so we can map them later on */
	useEffect(() => {
		async function getTop100() {
			const coins = await fetchTop100();
			setTop100(coins);
		}
		getTop100();
	}, []);

	return (
		<View style={styles.container}>
			<Text>Search</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'rgb(13, 0, 24)'
	}
});
