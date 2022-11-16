import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { Navigation } from './src/components/navigation/index'

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Navigation />
    </>
  );
}