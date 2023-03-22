import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import News from './screens/News';
import Watchlist from './screens/Watchlist';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Login from './screens/Login';
import Signup from './screens/Signup';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import { useContext } from 'react';
import IconButton from './components/ui/IconButton';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/* Navigation when user is not logged in */
function NotLoggedInStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Login" component={Login} />
			<Stack.Screen name="Signup" component={Signup} />
		</Stack.Navigator>
	);
}
/* Navigation when user logs in succesfully */
function LoggedInTabs() {
	const authCtx = useContext(AuthContext);
	let iconName: string;
	return (
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
				tabBarInactiveTintColor: 'gray',
				headerRight: () => <IconButton icon="ios-exit" color="black" size={30} onPress={authCtx.logout} />
			})}
		>
			<Tab.Screen name="Watchlist" component={Watchlist} />
			<Tab.Screen name="News" component={News} />
		</Tab.Navigator>
	);
}

function Navigation() {
	const authCtx = useContext(AuthContext);
	return (
		/* Render ui based on authentication (authCtx.isAuthenticated) */
		<NavigationContainer>
			{!authCtx.isAuthenticated && <NotLoggedInStack />}
			{authCtx.isAuthenticated && <LoggedInTabs />}
		</NavigationContainer>
	);
}

export default function App() {
	return (
		<AuthContextProvider>
			<Navigation />
		</AuthContextProvider>
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
