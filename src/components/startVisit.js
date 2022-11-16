import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from './Layouts/Header';

class App extends Component {
     constructor(props) {
          super(props);
          this.state = {
               showList: true
          };
     }

     Opcions = data => {
          switch (data) {
               case 'Crear Cliente':
                    this.props.navigation.navigate('Crear Cliente');
                    break;
               case 'Clientes':
                    this.props.navigation.navigate('Clientes');
                    break;
               default:
                    break;
          }
     };

     renderItem = ({ item }) => {
          return (
               <>
                    <TouchableOpacity onPress={() => this.Opcions(item.name)}>
                         <View style={styles.card}>
                              <View style={styles.title}>
                                   <Text style={styles.textTitle}>{item.name}</Text>
                                   <Icon style={styles.textIcon} name={item.icon} size={30} />
                              </View>
                              <View style={styles.icons}>
                                   <Text numberOfLines={2} style={styles.detailCard}>
                                        <Icon name="arrow-circle-right" size={20} color="#FAC227" />
                                   </Text>
                              </View>
                         </View>
                    </TouchableOpacity>
               </>
          );
     };

     render() {
          return (
               <>
                    <Header />
                    <View style={styles.view}>
                         <FlatList
                              numColumns={1}
                              style={{ backgroundColor: 'white' }}
                              keyExtractor={item => item.id}
                              renderItem={this.renderItem}
                              data={[
                                   { name: 'Clientes', icon: 'user-circle-o', id: 1 },
                                   { name: 'Crear Cliente', icon: 'user-plus', id: 2 },
                              ]}
                         />
                    </View>
               </>
          );
     }
}

const styles = StyleSheet.create({
     view: {
          flex: 1,
          paddingTop: 5,
          paddingHorizontal: 10,
          backgroundColor: 'white',
          height: '100%',
     },
     title: {
          backgroundColor: '#FFD101',
          borderTopLeftRadius: 9,
          borderTopRightRadius: 9,
     },
     textTitle: {
          position: 'absolute',
          color: 'black',
          fontSize: 19,
          padding: 4,
          fontWeight: 'bold',
          marginLeft: 50,
          marginTop: 7,
     },
     textIcon: {
          paddingVertical: 10,
          paddingLeft: 5,
          color: 'black',
     },
     card: {
          backgroundColor: 'white',
          marginHorizontal: 5,
          marginBottom: 12,
          marginTop: 12,
          borderWidth: 1,
          borderColor: '#FFD101',
          borderRadius: 10,
     },
     icons: {
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'stretch',
     },
     detailCard: {
          marginVertical: 5,
          paddingRight: 5,
     },
     logo: {
          width: '30%',
          height: 30,
          marginLeft: 6,
          marginVertical: 10,
     },
     navBar: {
          backgroundColor: 'black',
          width: '100%',
          height: 60,
     },
     version: {
          color: 'white',
          position: 'absolute',
          left: 210,
          top: 19,
          fontSize: 15,
     },
});

export default App;