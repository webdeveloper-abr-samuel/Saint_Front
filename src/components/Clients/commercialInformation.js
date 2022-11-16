import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RadioButton from '../Layouts/redioButton'
import { useIsFocused } from '@react-navigation/native';
import styles from "./style";

export default function App() {
     const [classification, setClassification] = useState("");
     const [orderRoute, setOrderRoute] = useState("");
     const [comment, setComment] = useState("");
     const [exteriorAdvertisement, setExteriorAdvertisement] = useState("");
     const [insideAdvertisement, setInsideAdvertisement] = useState("");
     const [display, setDisplay] = useState("");
     const [tipology, setTipology] = useState("");
     const dispatch = useDispatch();
     const isfocused = useIsFocused();

     const clients = useSelector((state) => { return state.products.clients });

     useEffect(() => {
          if (clients != "") {
               const { clasificacion, ordenRuta, comentarios, pubExte, pubInte, exhibi, tipologia } = clients
               setClassification(clasificacion);
               setOrderRoute(ordenRuta);
               setComment(comentarios);
               setExteriorAdvertisement(pubExte);
               setInsideAdvertisement(pubInte);
               setDisplay(exhibi);
               setTipology(tipologia);
          }
     }, [])

     if (!isfocused) {
          let values = {
               classification,
               orderRoute,
               comment,
               exteriorAdvertisement,
               insideAdvertisement,
               display,
               tipology
          }
          dispatch({ type: "COMMERCIAL_CHANGE", payload: values })
     }

     const optionsOfClassification = [
          { key: 'AA', text: 'AA' },
          { key: 'A', text: 'A' },
          { key: 'B', text: 'B' },
          { key: 'C', text: 'C' }
     ];

     const optionsOfExteriorAdvertisement = [
          { key: 'Si', text: 'Si' },
          { key: 'No', text: 'No' }
     ];

     const optionsOfInsideAdvertisement = [
          { key: 'Si', text: 'Si' },
          { key: 'No', text: 'No' }
     ];

     const optionsOfDisplay = [
          { key: 'Si', text: 'Si' },
          { key: 'No', text: 'No' }
     ];

     const modifyClassification = (someArg) => {
          setClassification(someArg);
     }

     const modifyExteriorAdvertisement = (someArg) => {
          setExteriorAdvertisement(someArg);
     }

     const modifyInsideAdvertisement = (someArg) => {
          setInsideAdvertisement(someArg);
     }

     const modifyDisplay = (someArg) => {
          setDisplay(someArg);
     }

     const itemPickerOfTipology = () => {
          const Tipologias = [
               { value: "", text: "" },
               { value: "Almacén Especializado en Abrasivos", text: "Almacén Especializado en Abrasivos" },
               { value: "Almacenes de Pinturas Arquitectonicas", text: "Almacenes de Pinturas Arquitectonicas" },
               { value: "Almacén de Pinturas Automotrices - Tinturadores", text: "Almacén de Pinturas Automotrices - Tinturadores" },
               { value: "Ferreterías en general", text: "Ferreterías en general" },
               { value: "Depósitos de materiales", text: "Depósitos de materiales" },
               { value: "Almacenes del Agro", text: "Almacenes del Agro" },
               { value: "Almacen Repuestos Automotriz", text: "Almacen Repuestos Automotriz" },
               { value: "Distribuidor Nacional Punto de Venta", text: "Distribuidor Nacional Punto de Venta" },
               { value: "Distribuidor Regional Punto de Venta", text: "Distribuidor Regional Punto de Venta" },
               { value: "Mayorista Punto de Venta", text: "Mayorista Punto de Venta" },
               { value: "Ferretería Industrial", text: "Ferretería Industrial" },
               { value: "Almacen de Eléctricos", text: "Almacen de Eléctricos" },
               { value: "Almacen Miscelaneo", text: "Almacen Miscelaneo" },
               { value: "Almacen de Cadena", text: "Almacen de Cadena" },
               { value: "Industria", text: "Industria" },
               { value: "Almacen de Seguridad Industrial", text: "Almacen de Seguridad Industrial" },
               { value: "Estructuras Metálicas Grandes", text: "Estructuras Metálicas Grandes" },
               { value: "Estructuras Metálicas Pequeñas", text: "Estructuras Metálicas Pequeñas" },
               { value: "Afilado", text: "Afilado" },
               { value: "Carroceros", text: "Carroceros" },
               { value: "Fabricación De Herramientas", text: "Fabricación De Herramientas" },
               { value: "Fundición", text: "Fundición" },
               { value: "Inoxidable", text: "Inoxidable" },
               { value: "Petróleo", text: "Petróleo" },
               { value: "Fibra De Vidrio", text: "Fibra De Vidrio" },
               { value: "Marmolero", text: "Marmolero" },
               { value: "Fábrica De Muebles", text: "Fábrica De Muebles" },
               { value: "Paneles", text: "Paneles" },
               { value: "Tableros", text: "Tableros" },
               { value: "Agro", text: "Agro" },
               { value: "Limeros", text: "Limeros" },
               { value: "Textil", text: "Textil" },
               { value: "Vidrio", text: "Vidrio" },
               { value: "Obra De Construción", text: "Obra De Construción" },
               { value: "AUTOMOTRÍZ", text: "AUTOMOTRÍZ" },
               { value: "METALMECÁNICO", text: "METALMECÁNICO" },
               { value: "FUNDICIÓN", text: "FUNDICIÓN" },
               { value: "VIDRIO", text: "VIDRIO" },
               { value: "PETRÓLEO", text: "PETRÓLEO" },
               { value: "MADERA", text: "MADERA" },
               { value: "CONSTRUCCIÓN", text: "CONSTRUCCIÓN" },
               { value: "MINERO", text: "MINERO" },
               { value: "CUERO", text: "CUERO" },
               { value: "PAPEL Y CARTÓN", text: "PAPEL Y CARTÓN" },
               { value: "FIBRA VIDRIO", text: "FIBRA VIDRIO" },
               { value: "HERRAMIENTAS", text: "HERRAMIENTAS" },
               { value: "ALIMENTOS", text: "ALIMENTOS" },
               { value: "TEXTIL", text: "TEXTIL" },
               { value: "PLÁSTICO", text: "PLÁSTICO" },
               { value: "ELÉCTRIO", text: "ELÉCTRIO" },
               { value: "Otros", text: "Otros" },
          ]
          return Tipologias.map(tipology => <Picker.Item label={tipology.text} value={tipology.value} />);
     }

     return (
          <View style={styles.content}>

               <Text>Clasificación del cliente</Text>
               <RadioButton
                    PROP={optionsOfClassification}
                    handleToUpdate={modifyClassification}
                    val={classification}
                    active={false}
                    width={60}
                    height={40}
                    direction={'row'}
               />

               <Text>Tipologia</Text>
               <Picker
                    style={styles.pickerStyle}
                    itemStyle={styles.dropdownBtnStyle}
                    mode="dropdown"
                    selectedValue={tipology}
                    dropdownIconColor={'white'}
                    onValueChange={selectedTipology => setTipology(selectedTipology)}>
                    {itemPickerOfTipology()}
               </Picker>

               <Text>Orden de ruta</Text>
               <TextInput style={styles.input} onChangeText={setOrderRoute} value={orderRoute} keyboardType="default" />

               <Text>Comentarios</Text>
               <TextInput style={styles.input} onChangeText={setComment} value={comment} keyboardType="default" />

               <Text>Aviso Exterior</Text>
               <RadioButton
                    PROP={optionsOfExteriorAdvertisement}
                    handleToUpdate={modifyExteriorAdvertisement}
                    val={exteriorAdvertisement}
                    active={false}
                    width={60}
                    height={40}
                    direction={'row'}
               />

               <Text>Aviso Interio</Text>
               <RadioButton
                    PROP={optionsOfInsideAdvertisement}
                    handleToUpdate={modifyInsideAdvertisement}
                    val={insideAdvertisement}
                    active={false}
                    width={60}
                    height={40}
                    direction={'row'}
               />

               <Text>Exhibidor</Text>
               <RadioButton
                    PROP={optionsOfDisplay}
                    handleToUpdate={modifyDisplay}
                    val={display}
                    active={false}
                    width={60}
                    height={40}
                    direction={'row'}
               />

          </View>
     );
}
