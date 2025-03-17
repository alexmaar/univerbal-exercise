import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '@/screens/home';
import FavoritesScreen from '@/screens/favorites';
import TopRatedScreen from '@/screens/top-rated';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { appRouteNames } from '@/routes';
import { z } from 'zod';
import { Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const Tab = createBottomTabNavigator();

const envSchema = z.object({
  EXPO_PUBLIC_SERVER_IP: z.string().ip(),
  EXPO_PUBLIC_SERVER_PORT: z.string().length(4),
});

const result = envSchema.safeParse(process.env);
if (result.error) {
  console.error(result.error);
}
console.info('[app]: ENV', result.data);

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" animated />

      <Tab.Navigator initialRouteName={appRouteNames.root}>
        <Tab.Screen
          name="tab-home"
          component={HomeScreen}
          options={{
            tabBarLabel: () => <Text>Home</Text>,
            tabBarIcon: () => <FontAwesome size={24} name="home" />,
          }}
        />
        <Tab.Screen
          name="tab-top-rated"
          component={TopRatedScreen}
          options={{
            tabBarLabel: () => <Text>Top rated</Text>,
            tabBarIcon: () => (
              <FontAwesome6 name="ranking-star" size={24} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="tab-favorites"
          component={FavoritesScreen}
          options={{
            tabBarLabel: () => <Text>Favorites</Text>,
            tabBarIcon: () => <FontAwesome size={24} name="heart" />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
