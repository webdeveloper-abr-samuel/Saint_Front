import React, { useEffect, useState } from 'react';
import { Text, View, Pressable, TextInput, ScrollView, PermissionsAndroid } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RadioButton from '../Layouts/redioButton'
import Geolocation from 'react-native-geolocation-service';
import { Requests } from '../../../api';
const petitions = new Requests()
import styles from "./style";

export default function App(props) {
     const {
          id,
          nombreNegocioConNit,
          ciudadPoblacion,
          direccion
     } = props.route.params.Data;

     const separator = nombreNegocioConNit.split('-');
     const nit = separator[1];

     const [hasInactiveSale, setHasInactiveSale] = useState(false);
     const [seller, setSellers] = useState("");
     const [observation, setObservation] = useState("");
     const [distributor, setDistributor] = useState("");
     const [socialClass, setSocialClass] = useState(1);
     const [latitude, setLatitude] = useState(0);
     const [longitude, setLongitude] = useState(0);
     const [typeObserver, setTypeObserver] = useState("");

     const itemPickerOfSellers = () => {
          const Sellers = [
               { id: 1, value: '', text: '' },
               { id: 2, value: 'ASESOR COMERCIAL PERÚ', text: 'ASESOR COMERCIAL PERÚ' },
               { id: 3, value: 'ASESOR DE APOYO A LA DISTRIBUCION PERU', text: 'ASESOR DE APOYO A LA DISTRIBUCION PERU' },
               { id: 4, value: 'ASESOR COMERCIAL ECUADOR', text: 'ASESOR COMERCIAL ECUADOR' },
               { id: 5, value: 'ASESOR DE APOYO A LA DISTRIBUCION ECUADOR', text: 'ASESOR DE APOYO A LA DISTRIBUCION ECUADOR' }
          ]
          return Sellers.map(seller => <Picker.Item label={seller.text} value={seller.value} />);
     }

     const itemPickerOfDistributor = () => {
          const Distributor = [
               { value: '', text: '' },
               { value: 'Comercializadora Abrasem', text: 'Comercializadora Abrasem' },
               { value: 'Importadora Lartizco', text: 'Importadora Lartizco' },
               { value: 'Casa Germana', text: 'Casa Germana' },
               { value: 'Corporación el Rosado', text: 'Corporación el Rosado' },
               { value: 'Ferretería Espinoza ', text: 'Ferretería Espinoza ' },
               { value: 'Importadora y comercializadora Profep', text: 'Importadora y comercializadora Profep' },
               { value: 'Maritza Beltrán Chica', text: 'Maritza Beltrán Chica' },
               { value: 'Diego Armando Flores Sucuzhañay', text: 'Diego Armando Flores Sucuzhañay' },
               { value: 'Cesar Ramón Navarrete Vergara', text: 'Cesar Ramón Navarrete Vergara' },
               { value: 'Jaime Emiliano Cuenca Macas ', text: 'Jaime Emiliano Cuenca Macas ' },
               { value: 'Eurotubo ', text: 'Eurotubo ' },
               { value: 'Ferricenter Constructor', text: 'Ferricenter Constructor' },
               { value: 'Comercial Selva Nor Peruana', text: 'Comercial Selva Nor Peruana' },
               { value: 'Grupo Manursa', text: 'Grupo Manursa' },
               { value: 'Grupo Roma', text: 'Grupo Roma' },
               { value: 'Peruana de inversiones', text: 'Peruana de inversiones' },
               { value: 'Aceros & servicios punto azul', text: 'Aceros & servicios punto azul' },
               { value: 'Representaciones ferreteros Gaby', text: 'Representaciones ferreteros Gaby' },
               { value: 'Skyline S.A.C', text: 'Skyline S.A.C' },
               { value: 'Corporación Daylum S.A.C', text: 'Corporación Daylum S.A.C' }
          ]
          return Distributor.map(distri => <Picker.Item label={distri.text} value={distri.value} />);
     }

     const PROP = [
          { key: 'Precio alto', text: 'Precio alto' },
          { key: 'Bajo rendimiento producto', text: 'Bajo rendimiento producto' },
          { key: 'Mucho inventario', text: 'Mucho inventario' },
          { key: 'Cartera con distribuidor', text: 'Cartera con distribuidor' },
          { key: 'Cliente no codificado', text: 'Cliente no codificado' },
          { key: 'Compra a otro distribuidor', text: 'Compra a otro distribuidor' },
          { key: 'Encargado ausente', text: 'Encargado ausente' },
          { key: 'Otra razón', text: 'Otra razón' },
          { key: 'Exclusividad con competidor', text: 'Exclusividad con competidor' },
          { key: 'Cotizacion', text: 'Cotizacion' },
          { key: 'Reacudo o Cobranza', text: 'Reacudo o Cobranza' },
     ];

     const handleToUpdate = (someArg) => {
          setSocialClass(someArg);
     }

     const fixOfProdAbrVen = () => {
          let listaProdAbraVen = [
               { prodAbraV: 'Lija de Agua Abracol' },
               { prodAbraV: 'Lija de Agua Omega' },
               { prodAbraV: 'Fibrodiscos' },
               { prodAbraV: 'Copas' },
               { prodAbraV: 'Ruedas' },
               { prodAbraV: 'Ruedas de Guadaña' },
               { prodAbraV: 'Discos de desbaste' },
               { prodAbraV: 'Discos de corte convencional' },
               { prodAbraV: 'Discos de Tronzadora' },
               { prodAbraV: 'Conos' },
               { prodAbraV: 'Gratas' },
               { prodAbraV: 'Gratas de alambre' },
               { prodAbraV: 'Copas de alambre' },
               { prodAbraV: 'Cepillos de alambre' },
               { prodAbraV: 'Diamantado segmentado Abracol' },
               { prodAbraV: 'Diamantado continuo Abracol' },
               { prodAbraV: 'Diamantado turbo Abracol' },
               { prodAbraV: 'Diamantado segmentado Omega' },
               { prodAbraV: 'Diamantado continuo Omega' },
               { prodAbraV: 'Diamantado turbo Omega' },
               { prodAbraV: 'Diamantado 1000 Cortes' },
               { prodAbraV: 'Otros productos de alambre' },
               { prodAbraV: 'Bloques' },
               { prodAbraV: 'Puntas montadas' },
               { prodAbraV: 'Telas Multiflex X-85' },
               { prodAbraV: 'Telaflex' },
               { prodAbraV: 'Tela Ultraflex' },
               { prodAbraV: 'Tela Omega' },
               { prodAbraV: 'Lija de banda' },
               { prodAbraV: 'Discos velcro' },
               { prodAbraV: 'Discos finos Abracol' },
               { prodAbraV: 'Discos finos Omega' },
               { prodAbraV: 'Discos finos F-PRO Max Inox' },
               { prodAbraV: 'Discos finos F-PRO Max Steel' },
               { prodAbraV: 'Flap Disc Abracol' },
               { prodAbraV: 'Flap Disc Omega' },
               { prodAbraV: 'Flap Disc F-PRO' },
               { prodAbraV: 'Lija roja Abracol' },
               { prodAbraV: 'Lija roja Omega' },
               { prodAbraV: 'Cinta antideslizante' },
               { prodAbraV: 'Otros' }
          ]
          let products = listaProdAbraVen.map((res, ind) => listaProdAbraVen[ind].prodAbraV.toString() + '| ' + 0 + '| ' + 0)
          return products.toString()
     }

     const clearData = () => {
          setSellers("")
          setObservation("")
          setDistributor("")
          setSocialClass("")
     }

     const save = async () => {
          let value = {
               idCliente: id,
               distribuidor: distributor,
               form: "gestionDiaria",
               imgRuta: "",
               nit,
               noVenta: socialClass,
               obsVenta: observation,
               prodAbrVen: fixOfProdAbrVen(),
               savedby: "thernandez",
               taskID: 0,
               valorPedido: 0,
               vendedor: seller,
               venta: "No",
               Latitude: latitude,
               Longitude: longitude,
               tipoObs: typeObserver
          }
          const result = await petitions.SaveDailyManagement(value);
          if (result) {
               alert('Gestion Guardada Correctamente');
               setTimeout(() => {
                    props.navigation.navigate('Clientes');
               }, 1000);
               clearData();
          }
     }

     const locations = async () => {
          try {
               const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
               if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    Geolocation.getCurrentPosition(
                         (position) => {
                              setLatitude(position.coords.latitude)
                              setLongitude(position.coords.longitude)
                         },
                         (error) => {
                              console.log(error.code, error.message);
                         },
                         { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                    );
               } else {
                    console.log("Location permission denied");
               }
          } catch (err) {
               console.warn(err);
          }
     }

     useEffect(() => { locations(); })

     return (
          <View style={styles.contentManagement}>
               <Text style={styles.titleHeader}>{nombreNegocioConNit}</Text>
               <Text style={styles.titleHeader}>{ciudadPoblacion} - {direccion}</Text>

               <Text style={styles.labels}>VENTA</Text>
               <View style={{ flexDirection: 'row' }}>
                    <Pressable style={[styles.buttonShowModal, styles.buttonOpen]} onPress={() => setHasInactiveSale(!hasInactiveSale)}>
                         <Text style={styles.textStyle}>No</Text>
                    </Pressable>
                    <Pressable
                         style={[styles.buttonShowModal, styles.buttonOpen]}
                         onPress={() => props.navigation.navigate('Menu Transferecias Aqui', { Data: props.route.params.Data })}
                    >
                         <Text style={styles.textStyle}>Si</Text>
                    </Pressable>
               </View>

               <ScrollView showsVerticalScrollIndicator={false} style={[!hasInactiveSale && { display: 'none' }, styles.ScrollReason]}>
                    <View style={styles.contentManagement}>
                         <Text style={styles.labels}>Vendedor</Text>
                         <Picker
                              style={styles.pickerStyle}
                              itemStyle={styles.dropdownBtnStyle}
                              mode="dropdown"
                              selectedValue={seller}
                              dropdownIconColor={'white'}
                              onValueChange={selectedSeller => setSellers(selectedSeller)}>
                              {itemPickerOfSellers()}
                         </Picker>

                         <Text style={styles.labels}>Distribuidor</Text>
                         <Picker
                              style={styles.pickerStyle}
                              itemStyle={styles.dropdownBtnStyle}
                              mode="dropdown"
                              selectedValue={distributor}
                              dropdownIconColor={'white'}
                              onValueChange={selectedDistri => setDistributor(selectedDistri)}>
                              {itemPickerOfDistributor()}
                         </Picker>

                         <Text style={styles.labels}>Tipo de Observacion</Text>
                         <Picker
                              style={styles.pickerStyle}
                              itemStyle={styles.dropdownBtnStyle}
                              mode="dropdown"
                              selectedValue={typeObserver}
                              dropdownIconColor={'white'}
                              onValueChange={selected => setTypeObserver(selected)}>
                              <Picker.Item label="General" value="General" />
                              <Picker.Item label="Competencia" value="Competencia" />
                              <Picker.Item label="Negocio" value="Negocio" />
                         </Picker>

                         <Text style={styles.labels}>Observaciones</Text>
                         <TextInput style={styles.input} onChangeText={setObservation} value={observation} keyboardType="default" />

                         <Text style={styles.labels}>Razones de no venta</Text>
                         <RadioButton
                              PROP={PROP}
                              handleToUpdate={handleToUpdate}
                              val={socialClass}
                              active={false}
                              width={530}
                              height={40}
                              direction={'column'}
                         />

                         <Pressable style={[styles.buttonShowModal, styles.buttonOpen]} onPress={() => save()}>
                              <Text style={styles.textStyle}>Guardar</Text>
                         </Pressable>
                    </View>
               </ScrollView>
          </View>
     );
}
