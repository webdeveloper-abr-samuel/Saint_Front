import React, { useState, useEffect } from 'react';
import {StyleSheet,Text,View,FlatList,TouchableOpacity,TextInput,AsyncStorage} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Requests } from '../../../api';

//IMPORTS COMPONENTS
import Costumers from '../Costumers';
import Detalle from '../detalle';
import Login from '../auth/login'
import Menu from '../menu'
import CountScreen from "../count";
import ReportCountScreen from "../reportCount"
import FinancialDiscountScreen from "../finacialDiscount"
import Header from '../Layouts/Header'
import newPass from '../newPass'
//VENTAS SELL-OUT
import StartVisit from '../startVisit'
import Client from '../Clients/client'
import DailyManagement from "../Clients/dailyManagement";
import MenuClient from "../Clients/menuClient";
//CREAR CLIENTES
import DatosNegocio from "../Clients/business";
import Ubicacion from "../Clients/location";
import InfoComercial from "../Clients/commercialInformation";
import Abrasivos from "../Clients/abrasive";
//TRANSFERENCIAS AQUI
import Details from "../hereTranfer/details";
import Headers from "../hereTranfer/header";
//RESUMEN DE EJECUCION
import ExecuteSummary from '../executeSummary'

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
const petitions = new Requests()

function CustomerScreen({ navigation: { navigate } }) {
  const [distributor, setDistributor] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [search, setSearch] = useState('');
  const [shouldShow, setShouldShow] = useState(false);

  const loadDistributor = async () => {
    const data = await petitions.getCustomers('');
    var country = await AsyncStorage.getItem('country');
    country == 1 ? setShouldShow(false) : setShouldShow(true);
    setDistributor(data.data);
    setMasterData(data.data);
  };

  const searchFilter = async (text = {}) => {
    try {
      setSearch(text);
      const newData = await petitions.getCustomers(text);
      setDistributor(newData.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => { loadDistributor(); },[]);

  const pressHandler = (data) => {
    navigate('Pedido', {
      Data: data
    })
  };

  const renderItem = ({ item }) => {
    return (
      <>
        <TouchableOpacity onPress={() => pressHandler(item)}>
          <View style={styles.card}>
            <Text style={styles.title}>{item.departamento}</Text>
            <Text style={styles.item}>{item.nombreNegocioConNit}</Text>
            <Text numberOfLines={4} style={[styles.detailCard, shouldShow && { display: 'none' }]}>
              <Text style={styles.address}>Direccion : </Text>
              <Text style={{ letterSpacing: 1 }}>{item.direccion}</Text>
            </Text>
            <Text numberOfLines={2} style={[styles.detailCard, !shouldShow && { display: 'none' }]}>
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

function EncabezadoScreen(Data) {
  return (
    <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Costumers Data={Data} />
      </View>
    </>
  );
}

function DetalleScreen() {
  return (
    <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Detalle />
      </View>
    </>
  );
}

function PedidoScreen({ route }) {
  const { Data } = route.params;
  return (
    <>
      <Header />
      <Tab.Navigator>
        <Tab.Screen name="Encabezado" component={EncabezadoScreen} initialParams={{ Data: Data }} />
        <Tab.Screen name="Detalle" component={DetalleScreen} />
      </Tab.Navigator>
    </>
  );
}

function MenuTransfer(props) {
  const { id, nombreNegocioConNit, ciudadPoblacion, direccion, telefono, lng, lat } = props.route.params.Data;
  return (
    <>
      <Tab.Navigator>
        <Tab.Screen name="Encabezado" component={Headers} initialParams={{ id, nombreNegocioConNit, ciudadPoblacion, direccion, telefono, lng, lat }} />
        <Tab.Screen name="Detalle" component={Details} />
      </Tab.Navigator>
    </>
  );
}

function CreateClient() {
  return (
    <>
      <Tab.Navigator>
        <Tab.Screen name="Negocio" component={DatosNegocio} />
        <Tab.Screen name="Ubicación" component={Ubicacion} />
        <Tab.Screen name="Comercial" component={InfoComercial} />
        <Tab.Screen name="Abrasivos" component={Abrasivos} />
      </Tab.Navigator>
    </>
  )
}

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
        <Stack.Screen name="Customer" component={CustomerScreen} />
        <Stack.Screen name="Pedido" component={PedidoScreen} />
        <Stack.Screen name="Count" component={CountScreen} />
        <Stack.Screen name="ReportCount" component={ReportCountScreen} />
        <Stack.Screen name="FinancialDiscount" component={FinancialDiscountScreen} />
        <Stack.Screen name="newPass" component={newPass} options={{ headerShown: false }} />
        <Stack.Screen name="Resumen de Ejecucion" component={ExecuteSummary} />
        {/* Iniciar Visita */}
        <Stack.Screen name="Iniciar Venta SellOut" component={StartVisit} />
        <Stack.Screen name="Clientes" component={Client} />
        <Stack.Screen name="Crear Cliente" component={CreateClient} />
        <Stack.Screen name="Gestion Diaria" component={DailyManagement} />
        <Stack.Screen name="Menu Cliente" component={MenuClient} />
        {/* Transferencias Aqui */}
        <Stack.Screen name="Menu Transferecias Aqui" component={MenuTransfer} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    paddingHorizontal: 5,
    backgroundColor: 'white',
  },
  item: {
    flex: 1,
    padding: 17,
    color: 'black',
    backgroundColor: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    textAlign: 'left',
    color: 'black',
    fontSize: 18,
    padding: 4,
    fontWeight: 'bold',
    backgroundColor: '#FFDE40',
  },
  card: {
    backgroundColor: 'white',
    marginBottom: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: 'lightgrey'
  },
  detailCard: {
    fontSize: 13,
    marginLeft: 20,
    marginBottom: 5
  },
  address: {
    fontWeight: 'bold',
    paddingLeft: 15
  },
  textInputStyle: {
    height: 50,
    borderWidth: 1,
    paddingLeft: 20,
    borderColor: '#009688',
    backgroundColor: 'white',
    color: 'black',
    marginBottom: 5
  }
});