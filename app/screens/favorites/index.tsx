import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { type ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import MovieScreen from '@/screens/movie';
import TvSeriesScreen from '@/screens/tv-series';

const FavoritesStack = createNativeStackNavigator();

const initialRouteName = 'favorites-root';

export default function FavoritesScreen(): ReactNode {
  return (
    <FavoritesStack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ffffff',
        },
        headerShadowVisible: false,
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: '600',
          color: '#1a1a1a',
        },
      }}
    >
      <FavoritesStack.Screen
        name={initialRouteName}
        component={Screen}
        options={{
          title: 'Favorites',
        }}
      />
      <FavoritesStack.Screen
        name="favorites-movies"
        component={MovieScreen}
        options={{
          title: 'Favorite Movies',
        }}
      />
      <FavoritesStack.Screen
        name="favorites-tv-series"
        component={TvSeriesScreen}
        options={{
          title: 'Favorite TV Series',
        }}
      />
    </FavoritesStack.Navigator>
  );
}

function Screen(): ReactNode {
  return (
    <View style={styles.root}>
      <TouchableOpacity style={styles.card}>
        <FontAwesome name="film" size={32} color="#1976d2" />
        <Text style={styles.cardTitle}>Favorite Movies</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <FontAwesome name="tv" size={32} color="#1976d2" />
        <Text style={styles.cardTitle}>Favorite TV Series</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    marginBottom: 16,
    alignItems: 'center',
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Android shadow
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginTop: 12,
  },
});
