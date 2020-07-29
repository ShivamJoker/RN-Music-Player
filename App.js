import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PlayerScreen from './src/PlayerScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <PlayerScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1B24',
    // alignItems: 'center',
    justifyContent: 'center',
  },
});
