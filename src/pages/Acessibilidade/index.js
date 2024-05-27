import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

export default function Acessibilidade() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Accessibility Settings</Text>

      <View style={styles.setting}>
        <Text style={styles.label}>Text Size: {fontSize}</Text>
        <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={10}
          maximumValue={40}
          minimumTrackTintColor="#000000"
          maximumTrackTintColor="#000000"
          onValueChange={(value) => setFontSize(value)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  setting: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
});
