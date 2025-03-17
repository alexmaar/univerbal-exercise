import { type ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

import { FeaturedMovies } from '@/features/featured-movies';
import { FeaturedTvSeries } from '@/features/featured-tv-series';
import { Search } from '@/features/search';

export function HomeScreen(): ReactNode {
  return (
    <View style={styles.root}>
      <View style={styles.searchContainer}>
        <Search />
      </View>

      <FeaturedMovies style={styles.section} />
      <FeaturedTvSeries style={styles.section} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  searchContainer: {
    paddingTop: 16,
    paddingBottom: 8,
  },
  section: {
    marginBottom: 32,
  },
});
