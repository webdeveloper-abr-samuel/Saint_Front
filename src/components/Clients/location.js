import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View, TextInput, Modal, Pressable, ScrollView } from 'react-native';
import RadioButton from '../Layouts/redioButton'
import { Picker } from '@react-native-picker/picker';
import { useIsFocused } from '@react-navigation/native';
import styles from "./style";

export default function App() {
     const [contry, setContry] = useState("");
     const [city, setCity] = useState("");
     const [neighborhood, setNeighborhood] = useState("");
     const [state, setState] = useState("");
     const [territory, setTerritory] = useState("");
     const [zone, setZone] = useState("");
     const [modalVisible, setModalVisible] = useState(false);
     const [hasAddress, setHasAddress] = useState(false);
     const [streets, setStreets] = useState("");
     const [letterOne, setLetterOne] = useState("");
     const [letterTwo, setLetterTwo] = useState("");
     const [letterThree, setLetterThree] = useState("");
     const [guideOne, setGuideOne] = useState("");
     const [guideTwo, setGuideTwo] = useState("");
     const [home, setHome] = useState("");
     const [textOne, setTextOne] = useState("");
     const [textTwo, setTextTwo] = useState("");
     const [textThree, setTextThree] = useState("");
     const [textFour, setTextFour] = useState("");
     const [address, setAddress] = useState("");
     const isfocused = useIsFocused();
     const dispatch = useDispatch();

     const clients = useSelector((state) => { return state.products.clients });

     useEffect(() => {
          if (clients != "") {
               const { pais, ciudadPoblacion, barrio, departamento, territorio, nombreComZon, direccion } = clients
               setContry(pais);
               setCity(ciudadPoblacion);
               setNeighborhood(barrio);
               setState(departamento);
               setTerritory(territorio);
               setZone(nombreComZon);
               setAddress(direccion);
               setHasAddress(true)
          }
     }, [])

     if (!isfocused) {
          let values = {
               contry, city, state, territory, zone, neighborhood, address
          }
          dispatch({ type: "LOCATION_CHANGE", payload: values })
     }

     const itemPickerOfCountry = () => {
          const Streets = [
               { id: 0, value: '', text: ''},
               { id: 1, value: 'Ecuador', text: 'Ecuador'},
               { id: 2, value: 'Peru', text: 'Peru'},
          ];
          return Streets.map(streets => <Picker.Item label={streets.text} value={streets.value} />);
     }

     //Direction
     const itemPickerOfStreets = () => {
          const Streets = [
               { value: '', text: '', id: 1 },
               { value: 'Avenida calle', text: 'Avenida calle', id: 2 },
               { value: 'Avenida', text: 'Avenida', id: 3 },
               { value: 'Calle', text: 'Calle', id: 4 },
               { value: 'Carrera', text: 'Carrera', id: 5 },
               { value: 'Circular', text: 'Circular', id: 6 },
               { value: 'Circunvalar', text: 'Circunvalar', id: 7 },
               { value: 'Diagonal', text: 'Diagonal', id: 8 },
               { value: 'Transversal', text: 'Transversal', id: 9 },
               { value: 'Manzana', text: 'Manzana', id: 10 },
          ]
          return Streets.map(streets => <Picker.Item label={streets.text} value={streets.value} />);
     }

     const itemPickerOfLetters = () => {
          const Letter = [
               { value: '', text: '', id: 1 },
               { value: 'A', text: 'A', id: 2 },
               { value: 'B', text: 'B', id: 3 },
               { value: 'C', text: 'C', id: 4 },
               { value: 'D', text: 'D', id: 5 },
               { value: 'E', text: 'E', id: 6 },
               { value: 'F', text: 'F', id: 7 },
               { value: 'G', text: 'G', id: 8 },
               { value: 'H', text: 'H', id: 9 },
               { value: 'I', text: 'I', id: 10 },
               { value: 'J', text: 'J', id: 11 },
               { value: 'K', text: 'K', id: 12 },
               { value: 'L', text: 'L', id: 13 },
               { value: 'M', text: 'M', id: 14 },
               { value: 'N', text: 'N', id: 15 },
               { value: 'Ñ', text: 'Ñ', id: 16 },
               { value: 'O', text: 'O', id: 17 },
               { value: 'P', text: 'P', id: 18 },
               { value: 'Q', text: 'Q', id: 19 },
               { value: 'R', text: 'R', id: 20 },
               { value: 'S', text: 'S', id: 21 },
               { value: 'T', text: 'T', id: 22 },
               { value: 'V', text: 'U', id: 23 },
               { value: 'V', text: 'V', id: 24 },
               { value: 'W', text: 'W', id: 25 },
               { value: 'X', text: 'X', id: 26 },
               { value: 'Y', text: 'Y', id: 27 },
               { value: 'Z', text: 'Z', id: 28 }
          ]
          return Letter.map(letters => <Picker.Item label={letters.text} value={letters.value} />);
     }

     const itemPickerOfGuide = () => {
          const Guide = [
               { value: '', text: '' },
               { value: 'Norte', text: 'Norte' },
               { value: 'Oriente', text: 'Oriente' },
               { value: 'Occidente', text: 'Occidente' },
               { value: 'Sur', text: 'Sur' }
          ]
          return Guide.map(guide => <Picker.Item label={guide.text} value={guide.value} />);
     }

     const itemPickerOfHome = () => {
          const Home = [
               { id: 1, value: '', text: '' },
               { id: 2, value: 'Apartamento', text: 'Apartamento' },
               { id: 3, value: 'Bodega', text: 'Bodega' },
               { id: 4, value: 'Bloque', text: 'Bloque' },
               { id: 5, value: 'Casa', text: 'Casa' }
          ]
          return Home.map(home => <Picker.Item label={home.text} value={home.value} />);
     }

     const Address = () => {
          let address = `${streets} ${textOne} ${letterOne}${letterTwo} ${guideOne} # ${textTwo}${letterThree} - ${textThree} ${guideTwo} ${home} ${textFour}`
          setAddress(address)
          setModalVisible(false)
          setHasAddress(true)
     }

     const PROP = [
          { key: 'Norte', text: 'Norte' },
          { key: 'Sur', text: 'Sur' },
          { key: 'Oriente', text: 'Oriente' },
          { key: 'Occidente', text: 'Occidente' },
          { key: 'Centro', text: 'Centro' }
     ];

     const handleToUpdate = (someArg) => {
          setTerritory(someArg);
     }

     return (
          <View style={styles.content}>
               <Text>Pais</Text>
               <Picker
                    style={styles.pickerStyle}
                    itemStyle={styles.dropdownBtnStyle}
                    mode="dropdown"
                    selectedValue={contry}
                    dropdownIconColor={'white'}
                    onValueChange={selected => setContry(selected)}>
                    {itemPickerOfCountry()}
               </Picker>

               <Text>Provincia</Text>
               <TextInput style={styles.input} onChangeText={setState} value={state} keyboardType="default" />

               <Text>Ciudad o Poblacion</Text>
               <TextInput style={styles.input} onChangeText={setCity} value={city} keyboardType="default" />

               <Text>Parroquia o Distrito</Text>
               <TextInput style={styles.input} onChangeText={setNeighborhood} value={neighborhood} keyboardType="default" />

               <Text>Territorio</Text>
               <RadioButton
                    PROP={PROP}
                    handleToUpdate={handleToUpdate}
                    val={territory}
                    active={false}
                    width={106}
                    height={40}
                    direction={'row'}
               />

               <Pressable style={[styles.buttonShowModal, styles.buttonOpen]} onPress={() => { setModalVisible(true); setHasAddress(false) }}>
                    <Text style={styles.textStyle}>Agregar Direccion</Text>
               </Pressable>

               <Text style={[!hasAddress && { display: 'none' }, styles.address]}>Dirección : {address}</Text>

               <View style={styles.centeredView}>
                    <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { setModalVisible(!modalVisible) }}>
                         <View style={styles.modalView}>
                              <ScrollView showsVerticalScrollIndicator={false}>
                                   <Text style={styles.modalText}>(Calle, Carrera, Circular, Etc)</Text>
                                   <Picker
                                        style={styles.pickerStyle}
                                        itemStyle={styles.dropdownBtnStyle}
                                        mode="dropdown"
                                        selectedValue={streets}
                                        dropdownIconColor={'white'}
                                        onValueChange={selectedStreets => setStreets(selectedStreets)}>
                                        {itemPickerOfStreets()}
                                   </Picker>
                                   <TextInput style={styles.input} onChangeText={setTextOne} value={textOne} keyboardType="default" />

                                   <Text style={styles.modalText}>Primera Letra</Text>
                                   <Picker
                                        style={styles.pickerStyle}
                                        itemStyle={styles.dropdownBtnStyle}
                                        mode="dropdown"
                                        selectedValue={letterOne}
                                        dropdownIconColor={'white'}
                                        onValueChange={selectedLetterOne => setLetterOne(selectedLetterOne)}>
                                        {itemPickerOfLetters()}
                                   </Picker>

                                   <Text style={styles.modalText}>Segunda Letra</Text>
                                   <Picker
                                        style={styles.pickerStyle}
                                        itemStyle={styles.dropdownBtnStyle}
                                        mode="dropdown"
                                        selectedValue={letterTwo}
                                        dropdownIconColor={'white'}
                                        onValueChange={selectedLetterTwo => setLetterTwo(selectedLetterTwo)}>
                                        {itemPickerOfLetters()}
                                   </Picker>

                                   <Text style={styles.modalText}>(Norte,Este,Oeste,Centro,Sur)</Text>
                                   <Picker
                                        style={styles.pickerStyle}
                                        itemStyle={styles.dropdownBtnStyle}
                                        mode="dropdown"
                                        selectedValue={guideOne}
                                        dropdownIconColor={'white'}
                                        onValueChange={selectedGuideOne => setGuideOne(selectedGuideOne)}>
                                        {itemPickerOfGuide()}
                                   </Picker>

                                   <Text style={styles.modalText}>#</Text>
                                   <TextInput style={styles.input} onChangeText={setTextTwo} value={textTwo} keyboardType="default" />

                                   <Text style={styles.modalText}>Letra</Text>
                                   <Picker
                                        style={styles.pickerStyle}
                                        itemStyle={styles.dropdownBtnStyle}
                                        mode="dropdown"
                                        selectedValue={letterThree}
                                        dropdownIconColor={'white'}
                                        onValueChange={selectedLetterThree => setLetterThree(selectedLetterThree)}>
                                        {itemPickerOfLetters()}
                                   </Picker>
                                   <TextInput style={styles.input} onChangeText={setTextThree} value={textThree} keyboardType="default" />

                                   <Text style={styles.modalText}>(Norte,Este,Oeste,Centro,Sur)</Text>
                                   <Picker
                                        style={styles.pickerStyle}
                                        itemStyle={styles.dropdownBtnStyle}
                                        mode="dropdown"
                                        selectedValue={guideTwo}
                                        dropdownIconColor={'white'}
                                        onValueChange={selectedGuideTwo => setGuideTwo(selectedGuideTwo)}>
                                        {itemPickerOfGuide()}
                                   </Picker>

                                   <Text style={styles.modalText}>(Apartamento, Conjunto, Bloque, Etc)</Text>
                                   <Picker
                                        style={styles.pickerStyle}
                                        itemStyle={styles.dropdownBtnStyle}
                                        mode="dropdown"
                                        selectedValue={home}
                                        dropdownIconColor={'white'}
                                        onValueChange={selectedHome => setHome(selectedHome)}>
                                        {itemPickerOfHome()}
                                   </Picker>
                                   <TextInput style={styles.input} onChangeText={setTextFour} value={textFour} keyboardType="default" />

                                   <Pressable style={[styles.button, styles.buttonSuccess]} onPress={() => Address()}>
                                        <Text style={styles.textStyle}>Listo</Text>
                                   </Pressable>
                                   <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
                                        <Text style={styles.textStyle}>Cerrar</Text>
                                   </Pressable>
                              </ScrollView>
                         </View>
                    </Modal>
               </View>
          </View>
     );
}
