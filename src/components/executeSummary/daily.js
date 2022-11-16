import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Card } from 'react-native-elements';
import { Requests } from '../../../api';
import styles from "./style";

const petitions = new Requests();

export default function App() {
     const [totalVisit, setTotalVisit] = useState(0);
     const [totalSale, setTotalSale] = useState(0);
     const [salesSuccess, setSalesSuccess] = useState(0);
     const [fulfillment, setFulfillment] = useState(0);
     const [visit, setVisit] = useState([]);


     const loadVisit = async () => {
          let hash = {};
          const result = await petitions.DailySummary();
          let saleWithValue = result.filter(hasValue =>  hasValue.valorPedido != 0 );
          let saleTotal = result.reduce((a, b) => a + (b.valorPedido || 0), 0);
          let visitMade = result.filter(values => hash[values.nombreNegocio] ? false : hash[values.nombreNegocio] = true);
          let percentageOfFulfillment = (Math.round((saleWithValue.length / visitMade.length) * 100)).toString();
          setTotalVisit(visitMade.length)
          setTotalSale(saleTotal.toLocaleString('es'));
          setSalesSuccess(saleWithValue.length);
          setFulfillment(percentageOfFulfillment > 0 ? percentageOfFulfillment : 0)
          setVisit(result)
     }

     useEffect(() => {
          loadVisit()
     },[])


     const renderItem = ({ item }) => {
          return (
               <>
                    <View style={styles.card}>
                         <Text style={styles.title}>{item.nombreNegocio} - {item.nit}</Text>
                         <Text style={{ paddingBottom: 10, padding: 5 }} numberOfLines={1}>
                              <Text style={{ letterSpacing: 2 }}>{item.direccion}, {item.barrio}{"\n"}</Text>
                         </Text>
                         <Text style={{ paddingBottom: 10, padding: 5 }} numberOfLines={1}>
                              <Text style={styles.address}>
                                   {item.valorPedido != 0 ? 'Venta: '+ item.valorPedido : 'No Venta : ' + item.noVenta }
                              </Text>
                         </Text>
                         <Text style={{ paddingBottom: 10, padding: 5 }} numberOfLines={1}>
                              <Text style={styles.address}>Fecha/Hora de Registro : {item.ingresoFH}</Text>
                         </Text>
                    </View>
               </>
          );
     };

     return (
          <>
               <View style={styles.content}>
                    <Card containerStyle={styles.containerCard}>
                         <Text style={styles.titles}>General</Text>
                         <View style={{ marginBottom: 10, marginTop: 20 }}>
                              <Text style={[styles.contentInfo, { backgroundColor: '#FFA500' }]}>Total Visitas Realizadas {totalVisit}</Text>
                              <Text style={[styles.contentInfo, { backgroundColor: '#87CEEB' }]}>Total Ventas ${totalSale}</Text>
                              <Text style={[styles.contentInfo, { backgroundColor: '#87CEEB' }]}>Ventas Exitosas {salesSuccess}</Text>
                              <Text style={[styles.contentInfo, { backgroundColor: '#8FBC8F' }]}>Cumplimiento {fulfillment}%</Text>
                         </View>
                    </Card>
                    <Card containerStyle={styles.containerCard}>
                         <Text style={styles.titles}>Clientes Visitados</Text>
                         <FlatList
                              style={{ width: 550 }}
                              numColumns={1}
                              keyExtractor={item => item.id}
                              data={visit}
                              renderItem={renderItem}
                         />
                    </Card>
               </View>
          </>
     )
}
