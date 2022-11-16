import React, { useState } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import RadioButton from '../Layouts/redioButton'
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import styles from "./style";

export default function App() {
     const optionsAverageOfBuy = [
          { key: 'Menos de 100.000', text: 'Menos de 100.000' },
          { key: 'Entre 100.000 y 300.000', text: 'Entre 100.000 y 300.000' },
          { key: 'Entre 300.000 y 500.000', text: 'Entre 300.000 y 500.000' },
          { key: 'Más de 500.000', text: 'Más de 500.000' }
     ];

     const [verageOfBuy, setAverageOfBuy] = useState("");
     const [listForDiscoFino, setListForDiscoFino] = useState([{ name: 'Abracol', checked: false },
     { name: 'UDUKE', checked: false },
     { name: 'Esforza', checked: false },
     { name: 'Uyustools', checked: false },
     { name: 'Fandeli', checked: false },
     { name: 'GreatTools', checked: false },
     { name: 'Wurth', checked: false },
     { name: 'Dewalt', checked: false },
     { name: 'PFERD', checked: false },
     { name: 'Chinos', checked: false },
     { name: 'Thon king', checked: false },
     { name: '3M', checked: false },
     { name: 'Carborundum', checked: false },
     { name: 'Norton', checked: false },
     { name: 'Unitec', checked: false },
     { name: 'Bisonte', checked: false },
     { name: 'Corneta', checked: false },
     { name: 'Omega', checked: false },
     { name: 'BARRACUDA', checked: false },
     { name: 'MAKITA', checked: false },
     { name: 'Otro', checked: false }]);
     const [listForFlacDisc, setListForFlacDisc] = useState([{ name: 'Abracol', checked: false },
     { name: 'UDUKE', checked: false },
     { name: 'Esforza', checked: false },
     { name: 'Uyustools', checked: false },
     { name: 'Fandeli', checked: false },
     { name: 'GreatTools', checked: false },
     { name: 'Wurth', checked: false },
     { name: 'Dewalt', checked: false },
     { name: 'PFERD', checked: false },
     { name: 'Chinos', checked: false },
     { name: 'Thon king', checked: false },
     { name: '3M', checked: false },
     { name: 'Carborundum', checked: false },
     { name: 'Norton', checked: false },
     { name: 'Unitec', checked: false },
     { name: 'Bisonte', checked: false },
     { name: 'Corneta', checked: false },
     { name: 'Omega', checked: false },
     { name: 'BARRACUDA', checked: false },
     { name: 'MAKITA', checked: false },
     { name: 'Otro', checked: false }]);
     const [listForLijadoSeco, setListForLijadoSeco] = useState([{ name: 'Abracol', checked: false },
     { name: 'UDUKE', checked: false },
     { name: 'Esforza', checked: false },
     { name: 'Uyustools', checked: false },
     { name: 'Fandeli', checked: false },
     { name: 'GreatTools', checked: false },
     { name: 'Wurth', checked: false },
     { name: 'Dewalt', checked: false },
     { name: 'PFERD', checked: false },
     { name: 'Chinos', checked: false },
     { name: 'Thon king', checked: false },
     { name: '3M', checked: false },
     { name: 'Carborundum', checked: false },
     { name: 'Norton', checked: false },
     { name: 'Unitec', checked: false },
     { name: 'Bisonte', checked: false },
     { name: 'Corneta', checked: false },
     { name: 'Omega', checked: false },
     { name: 'BARRACUDA', checked: false },
     { name: 'MAKITA', checked: false },
     { name: 'Otro', checked: false }]);
     const [isActiveDiscoFino, setIsActiveDiscoFino] = useState(false)
     const [isActiveFlacDisc, setIsActiveFlacDisc] = useState(false)
     const [isActiveLijadoSeco, setIsActiveLijadoSeco] = useState(false)
     const [selectBrand, setSelectBrand] = useState("")
     //const [BrandHasCheckedtrue, setBrandHasCheckedtrue] = useState([]);

     const changeStatusBrand = (status, name) => {
          if (isActiveDiscoFino) {
               setListForDiscoFino(curr => curr.filter((obj) => {
                    if (obj.name == name) {
                         obj.checked = status
                    }
                    return obj;
               }))
          }
          if (isActiveFlacDisc) {
               setListForFlacDisc(curr => curr.filter((obj) => {
                    if (obj.name == name) {
                         obj.checked = status
                    }
                    return obj;
               }))
          }
          if (isActiveLijadoSeco) {
               setListForLijadoSeco(curr => curr.filter((obj) => {
                    if (obj.name == name) {
                         obj.checked = status
                    }
                    return obj;
               }))
          }
     }

     const modifyAverage = (someArg) => {
          setAverageOfBuy(someArg);
     }

     let flatListRenderBrand = ({ item }) => {
          return (
               <CheckBox
                    center={false}
                    containerStyle={styles.CheckBoxBrands}
                    type="material"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    title={item.name}
                    checked={item.checked}
                    onPress={() => changeStatusBrand(!item.checked, item.name)}
               />
          )
     }

     const renderBrands = () => {
          return (
               <View style={styles.panel}>
                    <Text style={styles.panelTitle}>Marcas de {selectBrand}</Text>
                    <View style={[!isActiveDiscoFino && { display: 'none' }]}>
                         <FlatList
                              numColumns={3}
                              style={styles.flatlistContent}
                              keyExtractor={item => item.name}
                              data={listForDiscoFino}
                              renderItem={flatListRenderBrand}
                         />
                         <TouchableOpacity
                              style={styles.panelButton}
                              onPress={() => discoCorte.current.snapTo(1)}>
                              <Text style={styles.panelButtonTitle}>Cancel</Text>
                         </TouchableOpacity>
                    </View>
                    <View style={[!isActiveFlacDisc && { display: 'none' }]}>
                         <FlatList
                              numColumns={3}
                              style={styles.flatlistContent}
                              keyExtractor={item => item.name}
                              data={listForFlacDisc}
                              renderItem={flatListRenderBrand}
                         />
                         <TouchableOpacity
                              style={styles.panelButton}
                              onPress={() => flacDisc.current.snapTo(1)}>
                              <Text style={styles.panelButtonTitle}>Cancel</Text>
                         </TouchableOpacity>
                    </View>
                    <View style={[!isActiveLijadoSeco && { display: 'none' }]}>
                         <FlatList
                              numColumns={3}
                              style={styles.flatlistContent}
                              keyExtractor={item => item.name}
                              data={listForLijadoSeco}
                              renderItem={flatListRenderBrand}
                         />
                         <TouchableOpacity
                              style={styles.panelButton}
                              onPress={() => lijadoSeco.current.snapTo(1)}>
                              <Text style={styles.panelButtonTitle}>Cancel</Text>
                         </TouchableOpacity>
                    </View>
                    
               </View>
          )
     }

     const renderHeader = () => (
          <View style={styles.header}>
               <View style={styles.panelHeader}>
                    <View style={styles.panelHandle} />
               </View>
          </View>
     );
     
     const pressButton = (name) => {
          setSelectBrand(name)
          switch (name) {
               case 'Discos de corte fino':
                    setIsActiveDiscoFino(true)
                    setIsActiveFlacDisc(false)
                    setIsActiveLijadoSeco(false)
                    discoCorte.current.snapTo(0)
                    break;
               case 'Flap Disc':
                    setIsActiveFlacDisc(true)
                    setIsActiveDiscoFino(false)
                    setIsActiveLijadoSeco(false)
                    flacDisc.current.snapTo(0)
                    break;
               case 'Lijado en seco':
                    setIsActiveLijadoSeco(true)
                    setIsActiveDiscoFino(false)
                    setIsActiveFlacDisc(false)
                    lijadoSeco.current.snapTo(0)
                    break;
               default:
                    break;
          }
          
     }

     const discoCorte = React.useRef(null);
     const flacDisc = React.useRef(null);
     const lijadoSeco = React.useRef(null);
     const falldiscoCorte = new Animated.Value(1);
     const fallfalcDisc = new Animated.Value(1);
     const falllijadoSeco = new Animated.Value(1);

     return (
          <View style={styles.content}>
               <Text>Promedio de compra mensual en líneas de sustitución en pesos ($)</Text>
               <RadioButton
                    PROP={optionsAverageOfBuy}
                    handleToUpdate={modifyAverage}
                    val={verageOfBuy}
                    active={false}
                    width={540}
                    height={43}
                    direction={'column'}
               />

               <Text style={{ marginTop: 10 }}>Productos que consume en líneas de sustitución</Text>
               <View style={styles.contentButton}>
                    <TouchableOpacity
                         style={styles.principalbutton}
                         onPress={() => pressButton('Discos de corte fino')}>
                         <Text style={styles.panelButtonTitle}>Discos de corte fino.</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                         style={styles.principalbutton}
                         onPress={() => pressButton('Flap Disc')}>
                         <Text style={styles.panelButtonTitle}>Flap Disc.</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                         style={styles.principalbutton}
                         onPress={() => pressButton('Lijado en seco')}>
                         <Text style={styles.panelButtonTitle}>Lijado en seco.</Text>
                    </TouchableOpacity>
               </View>

               <BottomSheet
                    ref={discoCorte}
                    snapPoints={[450, 0, 0]}
                    renderContent={renderBrands}
                    renderHeader={renderHeader}
                    initialSnap={1}
                    callbackNode={falldiscoCorte}
                    enabledGestureInteraction={true}
               />

               <BottomSheet
                    ref={flacDisc}
                    snapPoints={[450, 0, 0]}
                    renderContent={renderBrands}
                    renderHeader={renderHeader}
                    initialSnap={1}
                    callbackNode={fallfalcDisc}
                    enabledGestureInteraction={true}
               />

               <BottomSheet
                    ref={lijadoSeco}
                    snapPoints={[450, 0, 0]}
                    renderContent={renderBrands}
                    renderHeader={renderHeader}
                    initialSnap={1}
                    callbackNode={falllijadoSeco}
                    enabledGestureInteraction={true}
               />
          </View>
     );
}