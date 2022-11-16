import React, { useState, useEffect } from 'react';
import { View, StyleSheet, AsyncStorage, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import moment from "moment";
import { FAB } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { Requests } from '../../api';
const petitions = new Requests()


const FabExample = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [shouldSave, setShouldSave] = useState(true);//dehabilitar boton guardar
  const [label, setLabel] = useState('');
  const [icon, setIcon] = useState('');

  const business = useSelector((state) => { return state.products.business });
  const location = useSelector((state) => { return state.products.location });
  const commercial = useSelector((state) => { return state.products.commercial });
  const abrasive = useSelector((state) => { return state.products.abrasive });
  const clients = useSelector((state) => { return state.products.clients });

  useEffect(() => {
    if (clients != "") {
      setLabel('Actualizar')
      setIcon('account-edit')
    } else {
      setLabel('Guardar')
      setIcon('content-save')
    }
  }, [])

  const addItem = async () => {
    let logUser = await AsyncStorage.getItem('usuario')
    const { nameBusiness, contact, email, nit, phoneNumber, position, socialClass } = business
    const { contry, city, state, territory, zone, neighborhood, address } = location
    const { classification, orderRoute, comment, exteriorAdvertisement, insideAdvertisement, display, tipology } = commercial
    const { id } = clients
    const date = moment().format("YYYY/MM/DD HH:mm:ss");
    let value = {
      id,
      nombreNegocio: nameBusiness,
      estrato: socialClass,
      nit,
      telefono: phoneNumber,
      contacto: contact,
      cargo: position,
      correo: email,
      pais: contry,
      departamento: state,
      ciudadPoblacion: city,
      territorio: territory,
      nroComunaZona: "",
      nombreComZon: zone,
      barrio: neighborhood,
      clasificacion: classification,
      tipologia: tipology,
      ordenRuta: orderRoute,
      comentarios: comment,
      direccion: address,
      creadoPor: logUser,
      modificadoPor: logUser,
      pubExte: exteriorAdvertisement,
      pubInte: insideAdvertisement,
      exhibi: display,
      taskID: 0,
      form: '',
      lat: latitude,
      lng: longitude,
      origenDatos: "app-ecuador-peru",
      prodAbrasivos: abrasive.toString(),
      lineasS: "",
      promCompr: "",
      UnCorteF: "",
      marcasFD: "",
      promLS: "",
      maLijS: "",
      numVerParPer: "",
      creacionFH: date,
      modificadoPor: "",
      modificacionFH: "",
      gooSitioId: "",
      foto: "",
      marcas: "",
      unFlapD: "",
      pIdRoute: -1
    }
    if (clients != "") {
      let response = await petitions.UpdateClient(value);
      if (response == 200) {
        alert("Cliente Actualizado Correctamente")
        setShouldSave(false)
      }
    } else {
      let response = await petitions.SaveClient(value);
      if (response == 200) {
        alert("Cliente Guardado Correctamente")
        setShouldSave(false)
      }
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
    <View>
      <FAB
        style={styles.fab}
        icon={icon}
        color='black'
        visible={shouldSave}
        animated={true}
        label={label}
        onPress={addItem}
      />
    </View>
  );
};

export default FabExample;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    left: 440,
    bottom: 30
  },
  textInput: {
    position: 'relative',
    margin: 18,
  },
  btn: {
    marginTop: 20,
  },
});