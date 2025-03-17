import { useAtomValue } from 'jotai';
import { loadable } from 'jotai/utils';
import { ScrollView, ViewStyle, StyleSheet, Text, View } from 'react-native';

import { movies$ } from './state';

import { Poster } from '@/ui/poster';
import { createAPIUrl } from '@/utils';

const apiUrl = createAPIUrl();

type Props = {
  style?: ViewStyle;
};

export function FeaturedMovies({ style }: Props): JSX.Element | null {
  const stateLoadable = useAtomValue(loadable(movies$));

  switch (stateLoadable.state) {
    case 'hasError':
    case 'loading': {
      return null;
    }

    case 'hasData': {
      return (
        <View style={[styles.root, style]}>
          <Text style={styles.title}>Featured Movies</Text>
          <ScrollView
            horizontal
            style={styles.list}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          >
            {stateLoadable.data.map((it, index) => (
              <View key={index} style={styles.item}>
                <Poster
                  //TODO customize by movie ID
                  src={new URL(`/poster.jpg`, apiUrl).href}
                  isFavorite
                  title={it.title}
                  onFavoritePress={undefined}
                />
                <Text style={styles.movieTitle} numberOfLines={2}>
                  {it.title}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  title: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 20,
    paddingHorizontal: 16,
    color: '#1a1a1a',
  },
  list: { flex: 1 },
  listContent: {
    paddingHorizontal: 16,
  },
  item: {
    marginRight: 16,
    width: 120,
    height: 200,
    backgroundColor: '#ffffff',
    borderRadius: 8,
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
  movieTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
    textAlign: 'center',
    color: '#333333',
  },
});
