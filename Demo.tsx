/* eslint-disable react-native/no-inline-styles */
import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const Demo = () => {
  const randomWidth = useSharedValue(10);
  const offset = useSharedValue(0);

  const config = {
    duration: 1000,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const style = useAnimatedStyle(() => {
    return {
      width: withTiming(randomWidth.value, config),
    };
  });

  const boxStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: offset.value}],
    };
  });

  return (
    <View style={{flex: 1}}>
      <View>
        <Animated.View
          style={[
            {
              width: 100,
              height: 80,
              backgroundColor: 'forestgreen',
              margin: 30,
            },
            style,
          ]}
        />
        <Button
          title="toggle"
          onPress={() => {
            randomWidth.value = Math.random() * 350;
          }}
        />
      </View>

      <View>
        <Animated.View
          style={[
            {
              width: 100,
              height: 100,
              backgroundColor: 'forestgreen',
              margin: 30,
            },
            boxStyle,
          ]}
        />
        <Button
          title="Move"
          onPress={() => {
            offset.value = withTiming(Math.random() * 255);
          }}
        />
      </View>
    </View>
  );
};

export default Demo;

const styles = StyleSheet.create({});
