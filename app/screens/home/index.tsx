import { type ReactNode } from 'react';
import { View } from 'react-native';

import { FeaturedMovies } from '@/features/featured-movies';
import { Search } from '@/features/search';

export function HomeScreen(): ReactNode {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View style={{ marginBottom: 40 }}>
        <Search />
      </View>

      <FeaturedMovies
        style={{
          marginBottom: 40,
        }}
      />
      {/* <FeaturedTvSeries /> */}
    </View>
  );
}
