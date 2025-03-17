import { Text, View, TextStyle } from 'react-native';

type Props = {
  value: number;
  max: number;
  textStyle: TextStyle;
};

export function Rating({ value, max = 100, textStyle }: Props) {
  return (
    <View>
      <Text style={textStyle}>{(value / max) * 100}%</Text>
    </View>
  );
}
