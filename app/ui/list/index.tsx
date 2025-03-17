import { ReactNode } from 'react';
import {
  FlatList,
  StyleProp,
  View,
  ViewStyle,
  Text,
  StyleSheet,
} from 'react-native';

import { Rating } from '../rating';

type ListProps = {
  style?: StyleProp<ViewStyle>;
  data: { id: string }[];
};

export function List({ style, data }: ListProps): ReactNode {
  return (
    <FlatList
      style={[styles.list, style]}
      data={data}
      keyExtractor={(it) => it.id}
      renderItem={(it) => {
        return (
          <ListEntry
            style={undefined}
            rating={(it.item as any).rating}
            title={(it.item as any).title}
          />
        );
      }}
      contentContainerStyle={styles.listContent}
    />
  );
}

type ListEntryProps = {
  style: any | undefined;
  title: string;
  rating: number;
};

function ListEntry({ style, title, rating }: ListEntryProps): ReactNode {
  // top rated has to have a rating above 75%
  const styles = getListEntryStyle(rating > 75);

  return (
    <View style={[styles.root, style]}>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      <Rating value={rating} />
    </View>
  );
}

const getListEntryStyle = (isHighlighted: boolean) => {
  return StyleSheet.create({
    root: {
      padding: 16,
      backgroundColor: isHighlighted ? '#fff9e6' : '#ffffff',
      borderRadius: 12,
      marginBottom: 12,
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
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: '#333333',
      marginBottom: 8,
    },
  });
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
