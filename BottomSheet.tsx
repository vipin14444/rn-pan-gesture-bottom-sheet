/* eslint-disable react-native/no-inline-styles */
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {FC, ReactNode, useEffect, useRef, useState} from 'react';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';

type Props = {
  children?: ReactNode;
  top?: number;
};

const BottomSheet: FC<Props> = ({children, top}) => {
  const offset = useSharedValue(
    (() => {
      if (top) {
        return top;
      }
      return 0;
    })(),
  );
  const [position, setPosition] = useState(() => {
    if (top) {
      return top;
    }
    return 0;
  });

  useEffect(() => {
    offset.value = (() => {
      if (top) {
        return top;
      }
      return 0;
    })();
    setPosition(() => {
      if (top) {
        return top;
      }
      return 0;
    });
  }, [offset, top]);

  const gestureRef = useRef(Gesture.Pan());

  const updatePosition = (translationY: number) => {
    setPosition(offset.value <= 0 ? 0 : translationY);
  };

  const onGestureEnd = (event: PanGestureHandlerEventPayload) => {
    'worklet';
    let {translationY} = event;
    runOnJS(updatePosition)(translationY + position);
  };

  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      let {translationY} = event;
      let offsetY = translationY + position;
      if (offsetY <= 0) {
        offsetY = 0;
      }
      offset.value = offsetY;
    })
    .onEnd(onGestureEnd)
    .withRef(gestureRef);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateY: offset.value}],
    };
  });

  return (
    <GestureDetector gesture={panGesture}>
      <View style={styles.container}>
        <View style={styles.backdrop} />
        <Animated.View style={[styles.bottomSheet, animatedStyles]}>
          {children ?? <Text>🎉 Awesome</Text>}
        </Animated.View>
      </View>
    </GestureDetector>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: Dimensions.get('screen').height,
    flex: 1,
  },
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.25)',
    width: '100%',
    height: '100%',
  },
  bottomSheet: {
    alignItems: 'center',
    backgroundColor: 'white',
    height: Dimensions.get('screen').height,
    position: 'absolute',
    width: '100%',
    shadowColor: 'black',
    shadowOpacity: 0.1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
});
