import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import axios from 'axios';

/* const getNews = async () => {
	try {
		const response = await axios.get('https://crypto-news16.p.rapidapi.com/news/cointelegraph', {
			headers: {
				'X-RapidAPI-Key': '71c7cffc00msh626cea577b58fabp161ce3jsncef1a0ff73e5',
				'X-RapidAPI-Host': 'crypto-news16.p.rapidapi.com'
			}
		});
		console.log(response);
	} catch (error) {
		console.log(error);
	}
}; */

export default function News() {
	return (
		<View>
			<Text>News</Text>
		</View>
	);
}

const styles = StyleSheet.create({});
