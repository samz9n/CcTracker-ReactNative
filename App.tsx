import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import News from './screens/News';
import Watchlist from './screens/Watchlist';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Login from './screens/Login';
import Signup from './screens/Signup';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
	let iconName: string;
	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						if (route.name === 'News') {
							iconName = focused ? 'ios-newspaper' : 'ios-newspaper-outline';
						} else if (route.name === 'Watchlist') {
							iconName = focused ? 'md-star-sharp' : 'md-star-outline';
						}
						return <Ionicons name={iconName} size={size} color={color} />;
					},
					tabBarActiveTintColor: 'tomato',
					tabBarInactiveTintColor: 'gray'
				})}
			>
				<Tab.Screen name="Watchlist" component={Watchlist} />
				<Tab.Screen name="News" component={News} />
			</Tab.Navigator>
			<Stack.Navigator>
				<Stack.Screen name="Login" component={Login} />
				<Stack.Screen name="Signup" component={Signup} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
