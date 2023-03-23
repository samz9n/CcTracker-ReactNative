/* Request logic for crypto data via CoinGecko API */
import axios from 'axios';
// Fetch top 100 coins by market cap
const fetchTop100 = async () => {
	const url =
		'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';
	const response = await axios.get(url);
	/* Transform the data into an array of objects that has the format we want them to have,
    because we dont need all values */
	const top100 = [];
	for (const key in response.data) {
		const coinObj = {
			id: response.data[key].id,
			name: response.data[key].name,
			symbol: response.data[key].symbol,
			price: response.data[key].current_price,
			priceChange: response.data[key].price_change_percentage_24h.toFixed(2),
			image: response.data[key].image
		};
		top100.push(coinObj);
	}
	return top100;
};

export { fetchTop100 };
