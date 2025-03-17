import { useAtom, useAtomValue } from 'jotai';
import { loadable } from 'jotai/utils';
import React, { ReactNode, useRef } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
  Text,
  TouchableOpacity,
} from 'react-native';

import { inputValue$, suggestions$ } from './state';

export type SearchProps = {
  style?: StyleProp<ViewStyle>;
};

export function Search({ style }: SearchProps): ReactNode {
  const inputRef = useRef<TextInput>(null);
  const [inputValue, setInputValue] = useAtom(inputValue$);
  const suggestions = useAtomValue(loadable(suggestions$));

  return (
    <View style={[searchStyles.root, style]}>
      <View style={searchStyles.inputContainer}>
        <TextInput
          ref={inputRef}
          style={searchStyles.input}
          placeholder="Search movies and TV shows..."
          placeholderTextColor="#999999"
          onChangeText={setInputValue}
          value={inputValue}
        />
      </View>

      {!inputValue ? null : (
        <View style={searchStyles.suggestions}>
          {suggestions.state !== 'hasData'
            ? null
            : suggestions.data.map((it) => (
                <TouchableOpacity
                  key={it.id}
                  style={searchStyles.suggestionEntry}
                  onPress={() => {
                    setInputValue(it.title);
                    inputRef.current?.blur();
                  }}
                >
                  <Text style={searchStyles.suggestionText}>{it.title}</Text>
                </TouchableOpacity>
              ))}
        </View>
      )}
    </View>
  );
}

const searchStyles = StyleSheet.create({
  root: {
    width: '100%',
    position: 'relative',
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  input: {
    height: 48,
    backgroundColor: '#f5f5f5',
    borderRadius: 24,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#333333',
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
  suggestions: {
    position: 'absolute',
    top: 64,
    left: 16,
    right: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginTop: 4,
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    // Android shadow
    elevation: 5,
    zIndex: 1000,
  },
  suggestionEntry: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  suggestionText: {
    fontSize: 16,
    color: '#333333',
  },
});
