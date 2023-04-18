# CcTracker-ReactNative

This mobile application is a cryptocurrency tracker, where you can select favorites from a wide range of cryptocurrencies, and check their market information. You can also see the latest crypto-related news.

Built with React Native, with Firebase as a backend. Firebase also takes care of the authentication. 

State is managed with React Context, and also traditional useStates.

For fetching the top 100 cryptocurrencies, the app uses Goingeckos free API (https://www.coingecko.com/en/api/documentation)
Example query for bitcoins chartData for one day: https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=usd&days=1
Example query for top 100 coins: https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false

Charts are built with react-native-wagmi-charts (https://github.com/coinjar/react-native-wagmi-charts)
![image](https://user-images.githubusercontent.com/64839531/232705917-8eafa776-d438-4932-bfb8-de12ecc0f36b.png)

