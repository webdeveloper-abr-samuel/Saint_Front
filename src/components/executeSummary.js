import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Daily from "./executeSummary/daily";
import Weekly from "./executeSummary/weekly";

const Tab = createMaterialTopTabNavigator();
export default function App() {
  return (
    <>
      <NavigationContainer independent={true}>
        <Tab.Navigator>
          <Tab.Screen name="Resumen Diario" component={Daily} />
          <Tab.Screen name="Resumen Semanal" component={Weekly} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
