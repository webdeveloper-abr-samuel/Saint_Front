import React, { useState,useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Text, View, TextInput } from 'react-native';
import RadioButton from '../Layouts/redioButton'
import { useIsFocused } from '@react-navigation/native';
import styles from "./style";


export default function App() {
     const [contact, setContact] = useState("");
     const [email, setEmail] = useState("");
     const [nameBusiness, setNameBusiness] = useState("");
     const [nit, setNit] = useState(0);
     const [phoneNumber, setPhoneNumber] = useState(0);
     const [position, setPosition] = useState("");
     const [socialClass, setSocialClass] = useState(1);
     const dispatch = useDispatch();
     const isfocused = useIsFocused();
     const clients = useSelector((state) => { return state.products.clients });

     useEffect(() => {
          if (clients != "") {
               const {contacto,correo,nombreNegocioConNit,telefono,cargo,estrato} = clients
               const separator = nombreNegocioConNit.split('-');
               const nombreNegocio = separator[0];
               const Nit = separator[1];
               setContact(contacto);
               setEmail(correo);
               setNameBusiness(nombreNegocio);
               setNit(Nit);
               setPhoneNumber(telefono);
               setPosition(cargo);
               setSocialClass(estrato);
          }
     },[])

     if (!isfocused) {
          let values = {
               contact, email, nameBusiness, nit, phoneNumber, position, socialClass
          }
          dispatch({ type: "BUSINESS_CHANGE", payload: values })
     }

     const PROP = [
          { key: '1', text: '1' },
          { key: '2', text: '2' },
          { key: '3', text: '3' },
          { key: '4', text: '4' },
          { key: '5', text: '5' }
     ];

     const handleToUpdate = (someArg) => {
          setSocialClass(someArg);
     }

     return (
          <View style={styles.content}>
               <Text>Nombre del Negocio</Text>
               <TextInput style={styles.input} onChangeText={setNameBusiness} value={nameBusiness} keyboardType="default" />

               <Text>Estrato</Text>
               <RadioButton
                    PROP={PROP}
                    handleToUpdate={handleToUpdate}
                    val={socialClass}
                    active={false}
                    width={60}
                    height={40}
                    direction={'row'}
               />

               <Text>Nit</Text>
               <TextInput style={styles.input} onChangeText={setNit} value={nit} keyboardType="numeric" />

               <Text>Número de teléfono</Text>
               <TextInput style={styles.input} onChangeText={setPhoneNumber} value={phoneNumber} keyboardType="phone-pad" />

               <Text>Contacto</Text>
               <TextInput style={styles.input} onChangeText={setContact} value={contact} keyboardType="default" />

               <Text>Cargo</Text>
               <TextInput style={styles.input} onChangeText={setPosition} value={position} keyboardType="default" />

               <Text>Correo Electrónico</Text>
               <TextInput style={styles.input} onChangeText={setEmail} value={email} keyboardType="email-address" />
          </View>
     )
}