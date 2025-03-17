import { TVSeries } from 'domain/tv-series';

import { useAtom } from 'jotai';
import { loadable } from 'jotai/utils';
import { useEffect, useState, type ReactNode } from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';

import { topRatedMovies$ } from './state';

import { getTopRatedTvSeriesQuery } from '@/infrastructure/repositories/tv-series';
import { List } from '@/ui/list';
import { Loader } from '@/ui/loader';

// Displays movies with rating above 75%
export default function TopRatedScreen(): ReactNode {
  const [topRatedMoviesLoadable] = useAtom(loadable(topRatedMovies$));

  const [tvSeres, set] = useState<TVSeries[]>([]);

  // fetches data for tv series
  useEffect(() => {
    getTopRatedTvSeriesQuery().then((res) => {
      set(res as TVSeries[]);
    });
  }, []);

  if (topRatedMoviesLoadable.state === 'loading') {
    return <Loader />;
  }

  // error
  if (topRatedMoviesLoadable.state === 'hasError') {
    return <Text>{JSON.stringify(topRatedMoviesLoadable.error)}</Text>;
  }

  if (topRatedMoviesLoadable.state === 'hasData') {
    return (
      <ScrollView style={styles.root}>
        {/* movies */}
        <Text style={styles.title}>Top Rated Movies</Text>
        <List data={topRatedMoviesLoadable.data} style={{ marginBottom: 40 }} />

        {/* tv series */}
        <Text style={styles.title}>Top Rated TV Series</Text>
        <List data={tvSeres} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 24,
    paddingHorizontal: 16,
    color: '#1a1a1a',
  },
});
