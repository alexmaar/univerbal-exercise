import {
  View,
  StyleSheet,
  Image,
  Pressable,
  StyleProp,
  ViewStyle,
  Text,
} from 'react-native';

type PosterProps = {
  title: string;
  src: string;
  onFavoritePress?: () => void;
  isFavorite: boolean;
  styles?: StyleProp<ViewStyle>;
};

export function Poster(props: PosterProps) {
  return (
    <View style={[styles.wrapper]}>
      {props.onFavoritePress && (
        <Pressable
          style={[
            styles.button,
            props.isFavorite
              ? {
                  backgroundColor: 'yellow',
                }
              : { backgroundColor: 'transparent' },
          ]}
          onPress={props.onFavoritePress}
        >
          <Text>{props.isFavorite ? '-' : '+'}</Text>
        </Pressable>
      )}
      <Image
        alt={props.title}
        source={{
          uri: props.src,
        }}
        resizeMode="contain"
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 180,
    width: 100,
  },
  button: {
    borderWidth: 2,
    borderColor: 'yellow',
    position: 'absolute',
    top: 0,
    right: 10,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
