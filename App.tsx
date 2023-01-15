import {SafeAreaView, Text} from 'react-native';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Demo from './Demo';
import List from './List';
import BottomSheet from './BottomSheet';
import PanExample from './PanExample';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <PanExample />
        {/* <BottomSheet /> */}
        {/* <List /> */}
        {/* <Demo /> */}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default App;
