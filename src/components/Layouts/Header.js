import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Home() {
  return (
    <>
      <SafeAreaView style={{backgroundColor: 'black'}}>
        <StatusBar barStyle="light-content" />
        <View style={styles.navBar}>
          <Image
            style={styles.logo}
            source={require('../../assets/logo-yellow.png')}
          />
          <Text style={styles.version}>
            <Icon name="bug" size={12} color="white" />
            Connected to Saint
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  logo: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    left:0,
    bottom:0,
    right:0,
    top:0,
    resizeMode:'contain'
  },
  navBar: {
    backgroundColor: 'black',
    width: '100%',
    height: 55,
  },
  version: {   
    position: 'absolute',
    alignSelf: 'flex-end',
    color: 'white',
    top: 20,
    fontSize: 15,
    paddingRight: 15
  },
});
