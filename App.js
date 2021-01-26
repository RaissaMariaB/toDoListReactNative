import React from 'react';
import Home from './src/Home';
import {SafeAreaView, View, StatusBar} from 'react-native';

const Todo = () => {
  return (
    <>
      <View style={{backgroundColor: '#7E39FB', height: 50}} />
      <SafeAreaView style={{flex: 1}}>
        <Home />
      </SafeAreaView>
    </>
  );
};

export default Todo;
