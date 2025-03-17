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
          <ScrollView horizontal style={styles.list}>
            {stateLoadable.data.map((it, index) => (
              <Poster
                key={index}
                //TODO customize by movie ID
                src={new URL(`/poster.jpg`, apiUrl).href}
                isFavorite
                title={it.title}
                onFavoritePress={undefined}
              />
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
    marginBottom: 20,
  },
  list: { flex: 1 },
});
