import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BottomSheet from './BottomSheet';

const PanExample = () => {
  return (
    <View>
      <View>
        <Text>Hello</Text>
      </View>
      <BottomSheet top={600}>
        <Text>Hello from PanExample!!</Text>
      </BottomSheet>
    </View>
  );
};

export default PanExample;

const styles = StyleSheet.create({});
