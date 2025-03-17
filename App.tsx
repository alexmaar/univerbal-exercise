import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import { z } from 'zod';

import { appRouteNames } from '@/routes';
import FavoritesScreen from '@/screens/favorites';
import { HomeScreen } from '@/screens/home';
import TopRatedScreen from '@/screens/top-rated';

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

      <Tab.Navigator
        initialRouteName={appRouteNames.root}
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#f5f5f5',
            height: 60,
            paddingBottom: 8,
            paddingTop: 5,
            borderTopWidth: 1,
            borderTopColor: '#e0e0e0',
            elevation: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
          },
          tabBarActiveTintColor: '#1976d2',
          tabBarInactiveTintColor: '#757575',
        }}
      >
        <Tab.Screen
          name="tab-home"
          component={HomeScreen}
          options={{
            tabBarLabel: ({ color }) => (
              <Text style={{ color, fontSize: 12 }}>Home</Text>
            ),
            tabBarIcon: ({ color }) => (
              <FontAwesome size={24} name="home" color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="tab-top-rated"
          component={TopRatedScreen}
          options={{
            tabBarLabel: ({ color }) => (
              <Text style={{ color, fontSize: 12 }}>Top rated</Text>
            ),
            tabBarIcon: ({ color }) => (
              <FontAwesome6 name="ranking-star" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="tab-favorites"
          component={FavoritesScreen}
          options={{
            tabBarLabel: ({ color }) => (
              <Text style={{ color, fontSize: 12 }}>Favorites</Text>
            ),
            tabBarIcon: ({ color }) => (
              <FontAwesome size={24} name="heart" color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
