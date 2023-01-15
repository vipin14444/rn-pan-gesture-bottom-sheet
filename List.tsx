/* eslint-disable react-native/no-inline-styles */
import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import uuid from 'react-native-uuid';
import Animated, {
  Layout,
  SlideInLeft,
  SlideOutRight,
} from 'react-native-reanimated';

const names = [
  'Alexandro Corral',
  'Sheila Coffman',
  'Amaiya Martinez',
  'Luke Hoff',
  'Ryleigh Mathew',
  'Kaliyah Lofton',
  'Kendall Heard',
  'Alex Whitaker',
  'Alexandre Levin',
  'Alvin Lewis',
];

const getRandomName = () => {
  return names[Math.floor(Math.random() * names.length)];
};

const getRandomUUID = () => uuid.v4().toString();

const List = () => {
  const [list, setList] = useState([
    {
      id: getRandomUUID(),
      title: 'Hello World!',
    },
    {
      id: getRandomUUID(),
      title: 'Appointment with doctor!',
    },
    {
      id: getRandomUUID(),
      title: 'Ash is the champion now!',
    },
  ]);

  const addItem = () => {
    setList([
      {
        id: getRandomUUID(),
        title: getRandomName(),
      },
      ...list,
    ]);
  };

  const deleteItem = (id: string) => {
    setList([...list.filter(x => x.id !== id)]);
  };

  return (
    <Animated.FlatList
      itemLayoutAnimation={Layout.springify()}
      data={list}
      renderItem={({item, index}) => (
        <Animated.View
          entering={SlideInLeft}
          exiting={SlideOutRight}
          key={item.id}
          style={{
            padding: 8,
            paddingHorizontal: 16,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
            borderBottomWidth: 1,
            borderBottomColor: 'whitesmoke',
          }}>
          <Text style={{flex: 1}}>{item.title}</Text>
          <Button title="X" onPress={() => deleteItem(item.id)} />
        </Animated.View>
      )}
      ListHeaderComponent={() => (
        <View>
          <Button title="Add Item" onPress={addItem} />
          <Button title="Clear List" onPress={() => setList([])} />
        </View>
      )}
    />
  );
};

export default List;

const styles = StyleSheet.create({});
