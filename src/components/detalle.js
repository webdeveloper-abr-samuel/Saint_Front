import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  AsyncStorage,
  Pressable,
} from 'react-native';

import { useDispatch } from 'react-redux';
import { Table,Row } from 'react-native-table-component';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Requests } from '../../api';
import { useIsFocused } from '@react-navigation/native';

const petitions = new Requests();

export default function App() {
  //let ListViewRef;
  const [products, setProducts] = useState([]);
  const [precio, setPrecio] = useState('Precio1');
  const [search, setSearch] = useState('');
  const [selectedItems, setSelectItems] = useState([]);
  const [shouldShow, setShouldShow] = useState(false);
  const [showList, setShowList] = useState(true);
  
  const dispatch = useDispatch();
  const isfocused = useIsFocused();

  if (!isfocused) {
    if (selectedItems.length) {
      dispatch({type : "PRODUCTS_CHANGE", payload: selectedItems})
    }else{
      dispatch({type : "PRODUCTS_CHANGE", payload: []})
    }
  }

  let loadProductSelect = (item) => {
    setShowList(true);
    let prod = selectedItems.filter((o) => { return o.CodProd === item.CodProd} )
    if (!prod.length) {
      setSelectItems(curr => [...curr,item])
    }
  }

  let renderItem = ({ item }) => {
    item.cantidad = 1;
    item.descuento = 0;
    const row1 = [item.CodProd + ' - ' + item.DESCRIPALL];
    const row3 = shouldShow ? ['Precio: ' + item[precio], 'Disponible: ' + item.Unidad] : ['Precio: ' + item.precio, 'Disponible: ' + item.Unidad];
    item.total = item[precio];

    return (
      <Pressable
        onPress={() => loadProductSelect(item)}>
        <View style={[styles.card, styles.titleItem]}>
          <Text style={[styles.title, styles.titleItem]}>{item.CodProd}</Text>
          <Table borderStyle={{ borderWidth: 0 }}>
            <Row data={row1} style={styles.head} textStyle={styles.textTitle} />
            <Row data={row3} style={styles.head} textStyle={styles.text} />
          </Table>
        </View>
      </Pressable>
    );
  };

  let renderProduct = ({ item, index }) => {
    const input = ind => (
      <TextInput
        value={() => {
          if (ind == 1) {
            return selectedItems[index].descuento;
          }
          if (ind == 2) {
            return selectedItems[index].cantidad;
          }
        }}
        defaultValue={'0'}
        keyboardType="numeric"
        onChangeText={text => {
          setSelectItems(curr => curr.map((obj,i) => {
            if (i === index) {
              if (shouldShow) {
                if (ind == 2) {
                  let descuento_total = (text * item[precio]) * (obj.descuento / 100 || 0);
                  let totalD = (text * item[precio]) - descuento_total
                  return {...obj, total: totalD , cantidad: text, descuento: obj.descuento || 0}
                }
                if (ind == 1 && obj.cantidad > 0) {
                  let descuento_total = (obj.cantidad * item[precio]) * (text / 100);
                  let totalD = (obj.cantidad * item[precio]) - descuento_total
                  return {...obj, total: totalD , descuento: text}
                }
              }
              if (!shouldShow) {
                if (ind == 2) {
                  let descuento_total = (text * obj.precio) * (obj.descuento / 100 || 0);
                  let totalD = (text * obj.precio) - descuento_total
                  return {...obj, total: totalD , cantidad: text, descuento: obj.descuento}
                }
                if (ind == 1 && obj.cantidad > 0) {
                  let descuento_total = (obj.cantidad * obj.precio) * (text / 100);
                  let totalD = (obj.cantidad * obj.precio) - descuento_total
                  return {...obj, total: totalD , descuento: text}
                }
              }
            }
            return obj
          }))
        }}
        style={styles.inputQuantity}
      />
    );

    const Strong = (title, text) => (
      <Text>
        <Text style={{ fontWeight: 'bold' }}>{title}</Text>
        <Text>{text}</Text>
      </Text>
    )

    const row = [
      [item.DESCRIPALL],
      [Strong('Precio: ', shouldShow ? item[precio] : item.precio)],
      [Strong('Cantidad: ', ''), input(2)],
      [Strong('Descuento: ', ''), input(1)],
      [Strong('Total: ', selectedItems[index].total)],
    ];

    const trashButton = (inde) => {
      setSelectItems((prevState) => {
        selectedItems.splice(inde, 1);
        return [...prevState]
      })
      AsyncStorage.setItem('productos', JSON.stringify(selectedItems));
      AsyncStorage.setItem('actualizar', 'true');
    }

    return (
      <>
        <View style={[styles.cardSelect, styles.product]}>
          <View style={[styles.title, styles.titleBorder, styles.contentHead]}>
            <Text style={styles.title}>
              <Icon name="barcode" size={18} color="black" />
              {item.CodProd}
            </Text>
            <Icon.Button
              style={styles.trashBotton}
              name="trash"
              size={20}
              backgroundColor="transparent"
              underlayColor="transparent"
              color="red"
              padding="0%"
              onPress={() => trashButton(index)}>
            </Icon.Button>
          </View>
          <Table borderStyle={{ borderWidth: 0 }} style={{ padding: 3 }}>
            <Row data={row[0]} style={styles.headSelect} textStyle={styles.text} />
            <Row data={row[1]} style={styles.headSelect} textStyle={styles.text} />
            <Row data={row[2]} style={styles.headSelect} textStyle={styles.text} />
            <Row data={row[3]} style={styles.headSelect} textStyle={styles.text} />
            <Row data={row[4]} style={styles.headSelect} textStyle={styles.text} />
          </Table>
        </View>
      </>
    );
  };

  let searchFilter = async (text = {}) => {
    try {
      if (text != '') {
        setShowList(false);
        const newData = await petitions.getProducts(text);
        setProducts(newData.data);
        setSearch(text)
      } else {
        setProducts([])
        setSearch(text)
      }
    } catch (err) {
      console.log(err);
    }
  };

  let contryOption =  async () => {
    var country = await AsyncStorage.getItem('country')
    if (country == 1) {
      setShouldShow(false)
    }
    if (country == 2) {
      setShouldShow(true)
    }
  }
  
  useEffect(() => {
    AsyncStorage.getItem('precio').then(item => { setPrecio(item) });
    contryOption();
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInputStyle}
        onChangeText={searchFilter}
      />

      <View style={styles.contentList}>
        <View style={[showList && { display: 'none' }]}>
          <FlatList
            numColumns={1}
            initialNumToRende={5}
            style={{ backgroundColor: 'white', marginTop: 8 }}
            keyExtractor={item => item.CodProd}
            data={products}
            renderItem={renderItem}
          />
        </View>

        <View style={[!showList && { display: 'none' }]}>
          <FlatList
            numColumns={1}
            inverted= {false}
            ListHeaderComponent={() => (
              <Text style={{ fontSize: 15, textAlign: "center", marginTop: 10, fontWeight: 'bold', marginBottom: -3}}>
                Productos Seleccionados
              </Text>
            )}
            initialNumToRende={30}
            maxToRenderPerBatch={30}
            style={styles.secondFlatlist}
            keyExtractor={item => item.ROWNUM}
            data={selectedItems}
            renderItem={renderProduct}
          />
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  head: {
    height: 60,
    backgroundColor: 'white',
  },
  text: {
    margin: 5,
    fontSize: 17,
    textAlign: 'left',
  },
  textTitle: {
    margin: 5,
    marginBottom: 8,
    fontSize: 17,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: 'white',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    color: 'black',
    width: '100%',
  },
  titleItem: {
    backgroundColor: '#D3D3D3',
    fontSize: 17,
  },
  title: {
    flex: 1,
    width: '100%',
    alignSelf: 'flex-start',
    textAlign: 'left',
    color: 'black',
    fontSize: 15,
    padding: 4,
    fontWeight: 'bold',
    backgroundColor: '#FFDE40',
  },
  container: {
    flex: 1,
    paddingTop: 5,
    paddingHorizontal: 5,
    backgroundColor: 'white',
    width: '100%',
  },
  cell: {
    borderWidth: 0,
    borderColor: '#ddd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    height: '100%',
    padding: 0,
    paddingTop: 0,
  },
  input: {
    height: 60,
    width: '80%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#0098D3',
    borderRadius: 5,
    marginBottom: 10,
    color: 'black',
    marginLeft: 14,
    paddingHorizontal: 20,
    marginTop: 4,
  },
  tinyLogo: {
    width: 100,
    height: 100,
    marginTop: -20,
    marginLeft: 10,
  },
  spacing: {
    marginTop: 10,
  },
  dropdownBtnStyle: {
    width: '80%',
    height: 35,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdownBtnTxtStyle: {
    color: '#444',
    textAlign: 'left',
  },
  dropdownDropdownStyle: {
    backgroundColor: '#EFEFEF',
  },
  dropdownRowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
  },
  dropdownRowTxtStyle: {
    color: '#444',
    textAlign: 'left',
  },
  scrollView: {
    marginHorizontal: 20,
    width: '100%',
  },
  textInputStyle: {
    height: 50,
    borderWidth: 1,
    paddingLeft: 20,
    borderColor: '#009688',
    backgroundColor: 'white',
    color: 'black'
  },
  secondFlatlist: {
    backgroundColor: 'white',
    position: 'relative',
    marginBottom: 50
  },
  inputQuantity: {
    height: 30,
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#0098D3',
    borderRadius: 5,
    color: 'black',
    padding: 3
  },
  trashBotton: {
    alignContent: 'flex-end',
    backgroundColor: 'transparent',
    top: 10
  },
  product: {
    marginTop: 10,
    borderColor: 'black'
  },
  titleBorder: {
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
  },
  contentHead: {
    flexDirection: 'row'
  },
  contentList: {
    marginTop: 5,
    //flexDirection: 'row',
    width: '100%',
    textAlign: 'center'
  },
  headSelect: {
    height: 40,
    padding: 4,
    backgroundColor: 'white',
  },
  cardSelect: {
    backgroundColor: 'white',
    marginBottom: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    color: 'black',
    marginLeft: 15,
    width: '90%'
  },
  /* buttonStyle: {
    position: 'absolute',
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow'
  } */
});