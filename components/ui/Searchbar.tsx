import { StyleSheet } from 'react-native';
import React from 'react';
import { SearchBar } from '@rneui/themed';

interface SearchbarProps {
	onChangeText: (text: string) => void;
	value: string;
}

export default function Searchbar({ onChangeText, value }: SearchbarProps) {
	return (
		<SearchBar
			inputContainerStyle={{ backgroundColor: 'rgb(210, 209, 211)', borderRadius: 10, height: 35 }}
			containerStyle={{ backgroundColor: 'rgb(13, 0, 24)' }}
			/* inputStyle={{ color: 'white' }} */
			placeholder="Search Here..."
			onChangeText={onChangeText}
			autoCorrect={false}
			value={value}
		/>
	);
}

const styles = StyleSheet.create({});
