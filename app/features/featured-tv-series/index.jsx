import { useAtomValue } from 'jotai';
import { loadable } from 'jotai/utils';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { featuredTvSeries$ } from './state';

import { Poster } from '@/ui/poster';
import { Rating } from '@/ui/rating';

export function FeaturedTvSeries() {
  const featuredTvSeriesLoadable = useAtomValue(loadable(featuredTvSeries$));
  return (
    <View style={featuredTvSeriesStyles.root}>
      <Text style={featuredTvSeriesStyles.title}>Featured TV Series</Text>
      <FlatList
        style={featuredTvSeriesStyles.list}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={featuredTvSeriesStyles.listContent}
        data={featuredTvSeriesLoadable.data}
        keyExtractor={(it) => it.id}
        renderItem={(it) => {
          return (
            <Entry
              title={it.item.title}
              rating={it.item.rating}
              seasons={it.item.seasons}
            />
          );
        }}
      />
    </View>
  );
}

const featuredTvSeriesStyles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 20,
    paddingHorizontal: 16,
    color: '#1a1a1a',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
  },
});

function Entry(props) {
  return (
    <View style={entryStyles.root}>
      <Poster
        title={props.title}
        src={
          'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/2560px-Image_created_with_a_mobile_phone.png'
        }
      />
      <View style={entryStyles.overlay}>
        <Text style={entryStyles.title} numberOfLines={2}>
          {props.title}
        </Text>
        <Rating textStyle={entryStyles.rating} value={props.rating} />
        <Text style={entryStyles.seasons}>{props.seasons.length} Seasons</Text>
      </View>
    </View>
  );
}

const entryStyles = StyleSheet.create({
  root: {
    height: 200,
    width: 120,
    marginRight: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: '100%',
    height: '100%',
    padding: 12,
    justifyContent: 'flex-end',
  },
  title: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  rating: {
    color: '#ffffff',
    fontSize: 12,
  },
  seasons: {
    color: '#ffffff',
    fontSize: 12,
    opacity: 0.8,
    marginTop: 4,
  },
});
