import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import Header from '../Layouts/Header';
import { Requests } from '../../../api';
const petitions = new Requests()

export default function App({ navigation: { navigate } }) {
     const [distributor, setDistributor] = useState([]);
     const [search, setSearch] = useState('');

     const loadDistributor = async () => {
          const data = await petitions.getClients('');
          setDistributor(data);
     };

     const searchFilter = async (text = {}) => {
          try {
               setSearch(text);
               const newData = await petitions.getClients(text);
               setDistributor(newData);
          } catch (err) {
               console.log(err);
          }
     };

     useEffect(() => {
          loadDistributor();
     });

     const pressHandler = (data) => {
          navigate('Menu Cliente', { Data: data })
     };

     const renderItem = ({ item }) => {
          return (
               <>
                    <TouchableOpacity onPress={() => pressHandler(item)}>
                         <View style={styles.card}>
                              <Text style={styles.title}>{item.departamento}</Text>
                              <Text style={styles.item}>{item.nombreNegocioConNit}</Text>
                              <Text style={{ marginLeft: 18, paddingBottom: 10 }} numberOfLines={2}>
                                   <Text style={styles.address}>Ubicacion : </Text>
                                   <Text style={{ letterSpacing: 2 }}>{item.ciudadPoblacion}, {item.departamento}{"\n"}</Text>
                                   <Text style={styles.address}>Direccion : </Text>
                                   <Text style={{ letterSpacing: 1.45 }}>{item.direccion}</Text>
                              </Text>
                         </View>
                    </TouchableOpacity>
               </>
          );
     };

     return (
          <>
               <Header />
               <View style={styles.container}>
                    <TextInput
                         style={styles.textInputStyle}
                         value={search}
                         placeholder="Busque aqui por nombre o nit"
                         underlineColorAndroid="transparent"
                         onChangeText={(text) => searchFilter(text)}
                    />
                    <FlatList
                         numColumns={1}
                         style={{ backgroundColor: 'white' }}
                         keyExtractor={item => item.cod}
                         data={distributor}
                         renderItem={renderItem}
                    />
               </View>
          </>
     );
}

const styles = StyleSheet.create({
     textInputStyle: {
          height: 50,
          borderWidth: 1,
          paddingLeft: 20,
          borderColor: '#009688',
          backgroundColor: 'white',
          color: 'black',
          marginBottom: 5
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
     item: {
          flex: 1,
          padding: 17,
          color: 'black',
          backgroundColor: 'white',
          fontSize: 20,
          fontWeight: 'bold',
     },
     address: {
          fontWeight: 'bold',
          paddingLeft: 15
     },
     container: {
          flex: 1,
          paddingTop: 5,
          paddingHorizontal: 5,
          backgroundColor: 'white',
     }
});