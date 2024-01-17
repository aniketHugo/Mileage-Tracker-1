// MyComponent.js
import React from 'react';
import { View, Text, Button } from 'react-native';
import useStore from './Store';
import { SafeAreaView } from 'react-native-safe-area-context';
import Realm from 'realm';
const MyStore = () => {
  const { count, increment, decrement } = useStore();
  console.log(count)
  return (
    <SafeAreaView>
wr
    <View>
      <Text>Count: {count}</Text>
      <Button title="Increment" onPress={increment} />
      <Button title="Decrement" onPress={decrement} />
    </View>
    </SafeAreaView>
  );
};

export default MyStore;
