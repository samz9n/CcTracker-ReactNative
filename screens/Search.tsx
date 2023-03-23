import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { fetchTop100 } from '../util/cryptoRest';
import CoinListButton from '../components/ui/CoinListButton';
import ListSeparator from '../components/ui/ListSeparator';
import { SearchBar } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

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
	const [ filteredCoinList, setFilteredCoinList ] = useState<Coin[]>([]);
	const navigation = useNavigation();

	/* We fetch the top 100 coins and set them to state so we can map them later on */
	useEffect(() => {
		async function getTop100() {
			const coins = await fetchTop100();
			setTop100(coins);
			setFilteredCoinList(coins);
		}
		getTop100();
	}, []);

	/* Adding a search bar to the header for this screen */
	useEffect(
		() => {
			navigation.setOptions({
				headerSearchBar: true,
				headerSearchBarOptions: {
					placeholder: 'Search Here...',
					onChangeText: (text: string) => searchFunction(text)
				}
			});
		},
		[ navigation ]
	);

	function searchFunction(text: string) {
		if (text) {
			const filteredList = top100.filter((item) => {
				const coinName = item.name.toUpperCase();
				const txtInput = text.toUpperCase();
				const coinSymbol = item.symbol.toUpperCase();
				return coinName.indexOf(txtInput) > -1;
			});
			setFilteredCoinList(filteredList);
		} else {
			setFilteredCoinList(top100);
		}
	}

	/* Search function for the searchbar */
	/* function searchFunction(text: string) {
		const updatedData = top100.filter((item) => {
			const coinName = item.name.toUpperCase();
			const txtInput = text.toUpperCase();
			const coinSymbol = item.symbol.toUpperCase();
			return coinName.indexOf(txtInput) > -1 || coinSymbol.indexOf(txtInput) > -1;
		});
		setSearchValue(text);
	} */

	return (
		<View style={styles.container}>
			{/* <SearchBar
				placeholder="Search Here..."
				lightTheme
				round
				value={searchValue}
				onChangeText={(text) => searchFunction(text)}
				autoCorrect={false}
			/> */}
			{/* List of top 100 coins, rendered with CoinListButton component */}
			<FlatList
				data={filteredCoinList}
				renderItem={({ item }) => {
					return (
						<CoinListButton
							onPress={() => {}}
							symbol={item.symbol}
							name={item.name}
							price={item.price}
							priceChange={item.priceChange}
							image={item.image}
						/>
					);
				}}
				keyExtractor={(item) => item.id}
				ItemSeparatorComponent={ListSeparator}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'rgb(13, 0, 24)'
	}
});
