import React, { useState, useEffect } from 'react';
import { Col, Row, Grid } from 'react-native-easy-grid';
import styles from "./styles";
import { View, Text, ScrollView, TextInput, Button, AsyncStorage } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux';
import { Requests } from '../../../api';
const petitions = new Requests();

export default function App(props) {
     const p = useSelector((state) => { return state.products });
     const { id, nombreNegocioConNit, ciudadPoblacion, direccion, telefono, lng, lat } = props.route.params
     let separate = nombreNegocioConNit.split("-")
     const nombreNegocio = separate[0];
     const nit = separate[1];
     const [productos, setProductos] = useState([]);
     const [referencias, setReferencias] = useState(0);
     const [text, onChangeText] = useState(''); //Observaciones
     const [total, setTotal] = useState(0);
     const [typeCustomer, setTypeCustomer] = useState("");
     const [distributor, setDistributor] = useState("");
     const [metodology, setMetodology] = useState("");
     const [shouldSave, setShouldSave] = useState(false);//dehabilitar boton guardar
     const [typeObserver, setTypeObserver] = useState("");

     const showElement = async () => {
          if (productos.length) {
               let i = 0
               productos.forEach(element => { i = i + element.total });
               setTotal(i);
               setReferencias(productos.length);
          } else {
               setReferencias(0);
               setTotal(0);
          }
     }

     const itemPickerOfCustomers = () => {
          const Customers = [
               { id : 1 ,value: '', text: ''},
               { id : 2 ,value: 'ASESOR COMERCIAL PERÚ', text: 'ASESOR COMERCIAL PERÚ' },
               { id : 3 ,value: 'ASESOR DE APOYO A LA DISTRIBUCION PERU', text: 'ASESOR DE APOYO A LA DISTRIBUCION PERU' },
               { id : 4 ,value: 'ASESOR COMERCIAL ECUADOR', text: 'ASESOR COMERCIAL ECUADOR' },
               { id : 5 ,value: 'ASESOR DE APOYO A LA DISTRIBUCION ECUADOR', text: 'ASESOR DE APOYO A LA DISTRIBUCION ECUADOR' }
          ]
          return Customers.map(customer => <Picker.Item label={customer.text} value={customer.value} />);
     }

     const itemPickerOfDistributor = () => {
          const Distributors = [
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
          return Distributors.map(distributor => <Picker.Item label={distributor.text} value={distributor.value} />);
     }

     const save = async () => {
          let savedBy = await AsyncStorage.getItem('usuario')
          let listaProdAbraVen = [
               'Lija de Agua Abracol',
               'Lija de Agua Omega',
               'Fibrodiscos',
               'Copas',
               'Ruedas',
               'Ruedas de Guadaña',
               'Discos de desbaste',
               'Discos de corte convencional',
               'Discos de Tronzadora',
               'Conos',
               'Gratas',
               'Gratas de alambre',
               'Copas de alambre',
               'Cepillos de alambre',
               'Diamantado segmentado Abracol',
               'Diamantado continuo Abracol',
               'Diamantado turbo Abracol',
               'Diamantado segmentado Omega',
               'Diamantado continuo Omega',
               'Diamantado turbo Omega',
               'Diamantado 1000 Cortes',
               'Otros productos de alambre',
               'Bloques',
               'Puntas montadas',
               'Telas Multiflex X-85',
               'Telaflex',
               'Tela Ultraflex',
               'Tela Omega',
               'Lija de banda',
               'Discos velcro',
               'Discos finos Abracol',
               'Discos finos Omega',
               'Discos finos F-PRO Max Inox',
               'Discos finos F-PRO Max Steel',
               'Flap Disc Abracol',
               'Flap Disc Omega',
               'Flap Disc F-PRO',
               'Lija roja Abracol',
               'Lija roja Omega',
               'Cinta antideslizante',
               'Otros',
               'Lija Fierro'
          ]
          let prod = [];
          let product = [];
          listaProdAbraVen.forEach(data => {
               let item = []
               var preci = 0;
               var canti = 0;
               item = productos.filter(car => {
                    if (car.ClassGroup == data) {
                         preci = preci + (car.precioUnit * car.cantidad)
                         canti += (car.cantidad * 1)
                         return true;
                    } else {
                         return false;
                    }
               })
               if (item.length > 0) {
                    prod.push(data + '| ' + canti + '| ' + preci);
               } else {
                    prod.push(data + '| 0 | 0');
               }
          })
          productos.forEach((element) => {
               product.push({
                    categoria: element.ClassGroup,
                    producto: element.ProductName,
                    precio: element.precioUnit,
                    Error: element.Error,
                    ProductClase: element.ProductClase,
                    ProductCode: element.ProductCode,
                    ProductDiscount: element.ProductDiscount,
                    ProductID: element.ProductID,
                    ProductImage: element.ProductImage,
                    ProductLast: element.ProductLast,
                    ProductMin: element.ProductMin,
                    ProductOnHandQty: element.ProductOnHandQty,
                    ProductPrecio: element.ProductPrecio,
                    ProductProdCode: element.ProductProdCode,
                    ProductQty: element.ProductQty,
                    ProductTaxCartID: element.ProductTaxCartID,
                    cantidad: element.cantidad,
                    total: element.totaltotal
               })
          })
          let values = {
               idCliente: id,
               venta: 'Si',
               noVenta: '',
               valorPedido: total,
               obsVenta: text,
               nit: nit,
               Latitude: lat,
               Longitude: lng,
               savedBy,
               imgRuta: metodology,
               taskID: "0",
               form: "app-ecuador-peru",
               vendedor: typeCustomer,
               distribuidor: distributor,
               prodAbrVen: prod.toString(),
               asesorDis: "",
               tipoObs: typeObserver,
               detalleOrden: product
          }
          let response = await petitions.saveDailyManagement(values);
          if (response == 200) {
               setShouldSave(true)
               alert("Transferencia Guardada Correctamente")
               setTimeout(() => {
                    props.navigation.navigate('Clientes');
               }, 1000);
          }
     }

     useEffect(() => {
          setTimeout(() => {
               console.log("entrando");
               setProductos(p.productsHereTranfer);
               showElement();
          }, 500);
     }, [p, productos])

     return (
          <>
               <ScrollView style={{ width: '100%', backgroundColor: 'white' }}>
                    <View style={styles.content_peru}>
                         <Grid>
                              <Col size={40}>
                                   <Row style={styles.cell}>
                                        <Text style={styles.boldText}> Nombre</Text>
                                   </Row>
                                   <Row style={[styles.cell, styles.different]}>
                                        <Text style={styles.boldText}> Nit</Text>
                                   </Row>
                                   <Row style={styles.cell}>
                                        <Text style={styles.boldText}> Ciudad</Text>
                                   </Row>
                                   <Row style={[styles.cell, styles.different]}>
                                        <Text style={styles.boldText}> Dirección</Text>
                                   </Row>
                              </Col>
                              <Col size={60}>
                                   <Row style={styles.cell}>
                                        <Text>{nombreNegocio}</Text>
                                   </Row>
                                   <Row style={[styles.cell, styles.different]}>
                                        <Text>{nit}</Text>
                                   </Row>
                                   <Row style={styles.cell}>
                                        <Text>{ciudadPoblacion}</Text>
                                   </Row>
                                   <Row style={[styles.cell, styles.different]}>
                                        <Text>{direccion}</Text>
                                   </Row>
                              </Col>
                         </Grid>
                    </View>

                    <View style={styles.content_peru}>
                         <Grid>
                              <Col size={40}>
                                   <Row style={[styles.cell]}>
                                        <Text style={styles.boldText}> Telefono</Text>
                                   </Row>
                                   <Row style={[styles.cell, styles.different]}>
                                        <Text style={styles.boldText}> Tipo de Observacion</Text>
                                   </Row>
                                   <Row style={[styles.cell]}>
                                        <Text style={styles.boldText}> Observación</Text>
                                   </Row>
                              </Col>
                              <Col size={60}>
                                   <Row style={[styles.cell]}>
                                        <Text>{telefono}</Text>
                                   </Row>
                                   <Row style={[styles.cell, styles.different]}>
                                        <Picker
                                             style={styles.pickerStyle}
                                             itemStyle={styles.dropdownBtnStyle}
                                             mode="dropdown"
                                             selectedValue={typeCustomer}
                                             dropdownIconColor={'black'}
                                             onValueChange={selected => setTypeObserver(selected)}>
                                             <Picker.Item label="General" value="General" />
                                             <Picker.Item label="Competencia" value="Competencia" />
                                             <Picker.Item label="Negocio" value="Negocio" />
                                        </Picker>
                                   </Row>
                                   <Row style={[styles.cell]}>
                                        <TextInput style={styles.input} onChangeText={onChangeText} value={text} />
                                   </Row>
                              </Col>
                         </Grid>
                    </View>

                    <View style={styles.content_peru}>
                         <Grid>
                              <Col size={40}>
                                   <Row style={[styles.cell, styles.different]}>
                                        <Text style={styles.boldText}> Tipo de asesor</Text>
                                   </Row>
                                   <Row style={[styles.cell]}>
                                        <Text style={styles.boldText}> Distribuidores</Text>
                                   </Row>
                                   <Row style={[styles.cell, styles.different]}>
                                        <Text style={styles.boldText}> Metodologia</Text>
                                   </Row>
                              </Col>
                              <Col size={60}>
                                   <Row style={[styles.cell, styles.different]}>
                                        <Picker
                                             style={styles.pickerStyle}
                                             itemStyle={styles.dropdownBtnStyle}
                                             mode="dropdown"
                                             selectedValue={typeCustomer}
                                             dropdownIconColor={'black'}
                                             onValueChange={selected => setTypeCustomer(selected)}>
                                             {itemPickerOfCustomers()}
                                        </Picker>
                                   </Row>
                                   <Row style={[styles.cell]}>
                                        <Picker
                                             style={styles.pickerStyle}
                                             itemStyle={styles.dropdownBtnStyle}
                                             mode="dropdown"
                                             selectedValue={distributor}
                                             dropdownIconColor={'black'}
                                             onValueChange={selected => setDistributor(selected)}>
                                             {itemPickerOfDistributor()}
                                        </Picker>
                                   </Row>
                                   <Row style={[styles.cell, styles.different]}>
                                        <Picker
                                             style={styles.pickerStyle}
                                             itemStyle={styles.dropdownBtnStyle}
                                             mode="dropdown"
                                             selectedValue={metodology}
                                             dropdownIconColor={'black'}
                                             onValueChange={selected => setMetodology(selected)}>
                                             <Picker.Item label="" value="" />
                                             <Picker.Item label="Presencial" value="Presencial" />
                                             <Picker.Item label="Telemercadeo" value="Telemercadeo" />
                                             <Picker.Item label="Feria" value="Feria" />
                                             <Picker.Item label="Mostrador" value="Mostrador" />
                                             <Picker.Item label="Cadenas" value="Cadenas" />
                                        </Picker>
                                   </Row>
                              </Col>
                         </Grid>
                    </View>

                    <View style={[styles.content_peru, styles.ajust]}>
                         <Grid>
                              <Col size={50}>
                                   <Row style={[styles.cell]}>
                                        <Text style={styles.boldText}> Total Productos pedidos</Text>
                                   </Row>
                                   <Row style={[styles.cell, styles.different]}>
                                        <Text style={styles.boldText}> SubTotal</Text>
                                   </Row>
                                   <Row style={[styles.cell]}>
                                        <Text style={styles.boldText}> Total</Text>
                                   </Row>
                              </Col>
                              <Col size={50}>
                                   <Row style={[styles.cell]}>
                                        <Text>{referencias}</Text>
                                   </Row>
                                   <Row style={[styles.cell, styles.different]}>
                                        <Text>{total}</Text>
                                   </Row>
                                   <Row style={[styles.cell]}>
                                        <Text>{total}</Text>
                                   </Row>
                              </Col>
                         </Grid>
                    </View>

                    <Button
                         style={{ marginTop: 10 }}
                         disabled={shouldSave}
                         onPress={() => save()}
                         title="Guardar"
                         color="#6495ED"
                    />
               </ScrollView>
          </>
     )
}