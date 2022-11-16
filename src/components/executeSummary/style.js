'use strict';
import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
     content: {
          flex: 1,
          flexDirection: 'column',
          paddingHorizontal: 10,
          paddingVertical: 10,
          backgroundColor: 'white',
          alignContent: 'center',
          alignItems: 'center',
     },
     containerCard: {
          width: '100%', 
          height: '47%',
          alignContent: 'center',
          alignItems: 'center'
     },
     contentInfo: {
          width: 500,
          height: 50,
          borderRadius: 3,
          alignItems: 'center',
          alignContent: 'center',
          textAlign: 'center',
          textAlignVertical: 'center',
          marginBottom: 5
     },
     titles: {
          textAlign: 'center',
          fontSize: 30
     },
     card: {
          backgroundColor: 'white',
          marginBottom: 12,
          marginTop: 12,
          borderWidth: 1,
          borderColor: 'lightgrey'
     },
     title: {
          textAlign: 'left',
          color: 'black',
          fontSize: 18,
          padding: 4,
          fontWeight: 'bold',
          backgroundColor: '#FFDE40',
     },
     address: {
          fontWeight: 'bold',
          paddingLeft: 15,
          fontSize: 14
     },
});