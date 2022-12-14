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
               { value: "Almac??n Especializado en Abrasivos", text: "Almac??n Especializado en Abrasivos" },
               { value: "Almacenes de Pinturas Arquitectonicas", text: "Almacenes de Pinturas Arquitectonicas" },
               { value: "Almac??n de Pinturas Automotrices - Tinturadores", text: "Almac??n de Pinturas Automotrices - Tinturadores" },
               { value: "Ferreter??as en general", text: "Ferreter??as en general" },
               { value: "Dep??sitos de materiales", text: "Dep??sitos de materiales" },
               { value: "Almacenes del Agro", text: "Almacenes del Agro" },
               { value: "Almacen Repuestos Automotriz", text: "Almacen Repuestos Automotriz" },
               { value: "Distribuidor Nacional Punto de Venta", text: "Distribuidor Nacional Punto de Venta" },
               { value: "Distribuidor Regional Punto de Venta", text: "Distribuidor Regional Punto de Venta" },
               { value: "Mayorista Punto de Venta", text: "Mayorista Punto de Venta" },
               { value: "Ferreter??a Industrial", text: "Ferreter??a Industrial" },
               { value: "Almacen de El??ctricos", text: "Almacen de El??ctricos" },
               { value: "Almacen Miscelaneo", text: "Almacen Miscelaneo" },
               { value: "Almacen de Cadena", text: "Almacen de Cadena" },
               { value: "Industria", text: "Industria" },
               { value: "Almacen de Seguridad Industrial", text: "Almacen de Seguridad Industrial" },
               { value: "Estructuras Met??licas Grandes", text: "Estructuras Met??licas Grandes" },
               { value: "Estructuras Met??licas Peque??as", text: "Estructuras Met??licas Peque??as" },
               { value: "Afilado", text: "Afilado" },
               { value: "Carroceros", text: "Carroceros" },
               { value: "Fabricaci??n De Herramientas", text: "Fabricaci??n De Herramientas" },
               { value: "Fundici??n", text: "Fundici??n" },
               { value: "Inoxidable", text: "Inoxidable" },
               { value: "Petr??leo", text: "Petr??leo" },
               { value: "Fibra De Vidrio", text: "Fibra De Vidrio" },
               { value: "Marmolero", text: "Marmolero" },
               { value: "F??brica De Muebles", text: "F??brica De Muebles" },
               { value: "Paneles", text: "Paneles" },
               { value: "Tableros", text: "Tableros" },
               { value: "Agro", text: "Agro" },
               { value: "Limeros", text: "Limeros" },
               { value: "Textil", text: "Textil" },
               { value: "Vidrio", text: "Vidrio" },
               { value: "Obra De Construci??n", text: "Obra De Construci??n" },
               { value: "AUTOMOTR??Z", text: "AUTOMOTR??Z" },
               { value: "METALMEC??NICO", text: "METALMEC??NICO" },
               { value: "FUNDICI??N", text: "FUNDICI??N" },
               { value: "VIDRIO", text: "VIDRIO" },
               { value: "PETR??LEO", text: "PETR??LEO" },
               { value: "MADERA", text: "MADERA" },
               { value: "CONSTRUCCI??N", text: "CONSTRUCCI??N" },
               { value: "MINERO", text: "MINERO" },
               { value: "CUERO", text: "CUERO" },
               { value: "PAPEL Y CART??N", text: "PAPEL Y CART??N" },
               { value: "FIBRA VIDRIO", text: "FIBRA VIDRIO" },
               { value: "HERRAMIENTAS", text: "HERRAMIENTAS" },
               { value: "ALIMENTOS", text: "ALIMENTOS" },
               { value: "TEXTIL", text: "TEXTIL" },
               { value: "PL??STICO", text: "PL??STICO" },
               { value: "EL??CTRIO", text: "EL??CTRIO" },
               { value: "Otros", text: "Otros" },
          ]
          return Tipologias.map(tipology => <Picker.Item label={tipology.text} value={tipology.value} />);
     }

     return (
          <View style={styles.content}>

               <Text>Clasificaci??n del cliente</Text>
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
