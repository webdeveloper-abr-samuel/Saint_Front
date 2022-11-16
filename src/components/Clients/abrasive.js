import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View, FlatList } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native';
import Fab from '../fab'
import styles from "./style";

export default function App() {
     const nameAndStatusOfProducts = [
          { name: 'Lija de Agua', checked: false },
          { name: 'Lija de Agua Omega', checked: false },
          { name: 'Lijado Fierro', checked: false },
          { name: 'Fibrodiscos', checked: false },
          { name: 'Copas', checked: false },
          { name: 'Ruedas', checked: false },
          { name: 'Ruedas de Guadaña', checked: false },
          { name: 'Discos de desbaste convencionales', checked: false },
          { name: 'Discos de corte convencionales', checked: false },
          { name: 'Discos de Tronzadora', checked: false },
          { name: 'Conos', checked: false },
          { name: 'Gratas', checked: false },
          { name: 'Gratas de alambre', checked: false },
          { name: 'Copas de alambre', checked: false },
          { name: 'Discos diamantados', checked: false },
          { name: 'Bloques', checked: false },
          { name: 'Puntas montadas', checked: false },
          { name: 'Telas', checked: false },
          { name: 'Lija de banda', checked: false },
          { name: 'Discos velcro', checked: false },
          { name: 'Discos de corte fino', checked: false },
          { name: 'Flap Disc', checked: false },
          { name: 'Lijado en seco', checked: false }
     ]

     const [listProducts, setListProducts] = useState(nameAndStatusOfProducts);
     const [productHasCheckedtrue, setProductHasCheckedtrue] = useState({});
     const dispatch = useDispatch();
     const isfocused = useIsFocused();

     const clients = useSelector((state) => { return state.products.clients });

     useEffect(() => {
          if (clients != "") {
               const { prodAbrasivos } = clients;
               let abrasives = prodAbrasivos.split(',')
               nameAndStatusOfProducts.forEach(element => {
                    for (const key in abrasives) {
                         if (element.name == abrasives[key]) {
                              element.checked = true;
                         }
                    }
               });
          }
     }, [])

     if (isfocused) {
          dispatch({ type: "ABRASIVE_CHANGE", payload: productHasCheckedtrue })
     }

     const changeStatusOfProducts = (status, name) => {
          setListProducts(curr => curr.filter((obj) => {
               if (obj.name == name) {
                    obj.checked = status
               }
               return obj;
          }))
          let changeStatusProduct = listProducts.filter(status => status.checked == true);
          let nameProducts = changeStatusProduct.map(element => element.name);
          setProductHasCheckedtrue(nameProducts)
     }

     let renderProducts = ({ item }) => {
          return (
               <CheckBox
                    center={false}
                    containerStyle={styles.CheckBox}
                    type="material"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    title={item.name}
                    checked={item.checked}
                    onPress={() => changeStatusOfProducts(!item.checked, item.name)}
               />
          )
     }

     return (
          <>
               <View style={styles.content}>
                    <Text>Productos abrasivos que maneja el ferretero</Text>
                    <FlatList
                         numColumns={1}
                         initialNumToRende={5}
                         style={styles.flatlistContent}
                         keyExtractor={item => item.name}
                         data={listProducts}
                         renderItem={renderProducts}
                    />
               </View>
               <Fab />
          </>
     );
}