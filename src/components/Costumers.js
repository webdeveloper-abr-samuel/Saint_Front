import React, { useState, useEffect } from 'react';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import { Requests } from '../../api';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Button,
  AsyncStorage,
} from 'react-native';
import { useSelector } from 'react-redux';
const countries = <Picker.Item label="" value="" />;
const petitions = new Requests();


AsyncStorage.getItem('usuario').then(item => {
  usuario = JSON.parse(item);
});

export default function App(props) {
  const {
    nombreNegocioConNit,
    departamento,
    ciudadPoblacion,
    direccion,
    telefono,
    cod,
    ctipre,
    moncre,
    cod_auditoria,
    nombre,
    vendedor,
    user,
    Direc2,
    ID3,
    CodVend
  } = props.Data.route.params.Data;

  const p = useSelector((state) => { return state.products });
  const separator = nombreNegocioConNit.split('-');
  const nombreNegocio = separator[0];
  const nit = separator[1];
  const [productos, setProductos] = useState([]);
  const [referencias, setReferencias] = useState(0);
  const [total, setTotal] = useState(0);
  const [bool, setBool] = useState(1);
  const [bodegas, setBodegas] = useState(countries);
  const [selectedBodega, setSelectedBodega] = useState(0);
  const [shouldShow, setShouldShow] = useState(false); //validacion si es peru o no
  const [selectedMoneda, setSelectedMoneda] = useState(); //tipo de moneda
  const [tipo_precio, setPrecio] = useState(); //Precio
  const [text, onChangeText] = useState(''); //Observaciones
  const [numDoc, onChangeNumDoc] = useState(''); //Doc.Ref Pedido
  const [total_bruto, totalBruto] = useState(0);// Total Bruto
  const [total_desc, totalDesc] = useState(0);// Total Descuento => descuento del producto + descuento aplicado
  const [totav_venta, totaV_Venta] = useState(0);// Total Valor Venta => resta entre total bruto y el total descuento
  const [total_igv, total_IGV] = useState(0);// Total Valor IVA => el total de venta * el iva del producto
  const [totalp_venta, totalp_Venta] = useState(0);// Total Precio Venta => total del iva + total de venta
  const [totalV, TotalV] = useState(0);
  const [shouldSave, setShouldSave] = useState(false);//dehabilitar boton guardar

  AsyncStorage.setItem('precio', 'Precio1')
  AsyncStorage.setItem('tprecio', ctipre)
  AsyncStorage.setItem('tmoneda', moncre)


  const showElement = async () => {
    var country = await AsyncStorage.getItem('country');
    if (country == 1) {
      setShouldShow(false)
    }
    if (country == 2) {
      setShouldShow(true);
    }
    if (productos.length) {
      let valores_encabezado = []
      let i = 0
      productos.forEach(element => {
        let total_catidad_prod = element.cantidad * element.precio_original;
        let DFDESCTO = total_catidad_prod * (element.descuento / 100)
        let DFIGV = (total_catidad_prod - DFDESCTO) * (element.iva / 100)
        i = i + element.total;
        valores_encabezado.push({
          total_catidad_prod,
          DFDESCTO,
          DFIGV
        })
      });
      let ToTalV = i.toFixed(0);
      setTotal(i);
      TotalV(ToTalV)
      let Total_Descuento = valores_encabezado.map(item => parseFloat(item.DFDESCTO)).reduce((prev, curr) => prev + curr, 0);
      let I_G_V = valores_encabezado.map(item => parseFloat(item.DFIGV)).reduce((prev, curr) => prev + curr, 0);
      let Total_Bruto = valores_encabezado.map(item => parseFloat(item.total_catidad_prod)).reduce((prev, curr) => prev + curr, 0);
      let TotalV_Venta = Total_Bruto - Total_Descuento
      let TotalP_V = TotalV_Venta + I_G_V

      setReferencias(productos.length);
      totalDesc(Total_Descuento.toFixed(2));
      total_IGV(I_G_V.toFixed(2));
      totalBruto(Total_Bruto.toFixed(2));
      totaV_Venta(TotalV_Venta.toFixed(2))
      totalp_Venta(TotalP_V.toFixed(2))
    } else {
      resetElements();
    }
  }

  const resetElements = () => {
    setReferencias(0);
    TotalV(0)
    totalDesc(0);
    total_IGV(0);
    totalBruto(0);
    totaV_Venta(0)
    totalp_Venta(0)
  }

  const realizarPedido = async () => {
    setShouldSave(true)
    let email = await AsyncStorage.getItem('email')
    let detalle = productos;
    let encabezado = {
      nombreNegocio,
      cod,
      direccion,
      moncre,
      cod_auditoria,
      vendedor,
      total_igv,
      user,
      totalp_venta,
      text,
      numDoc,
      total_desc,
      email
    }
    let detalles = []
    detalle.forEach(element => {
      let total_catidad_prod = element.cantidad * element.precio_original;
      let prc_ori_desc = element.precio_original * (element.descuento / 100);
      let res_prc_ori_desc = element.precio_original - prc_ori_desc
      let DFDESCTO = total_catidad_prod * (element.descuento / 100)
      let DFPORDES = element.descuento//posible error
      let DFCANTID = element.cantidad
      let DFSALDO = element.cantidad
      let DFIGV = (total_catidad_prod - DFDESCTO) * (element.iva / 100)
      let DFPREC_VEN = res_prc_ori_desc + ((res_prc_ori_desc * element.iva) / 100)
      let DFIMPMN = DFPREC_VEN * element.cantidad

      detalles.push({
        DFDESCTO,
        DFPORDES,
        DFCANTID,
        DFSALDO,
        DFIGV,
        DFPREC_VEN,
        DFIMPMN,
        CodProd: element.CodProd,
        DESCRIPALL: element.DESCRIPALL,
        valor_venta: element.valor_venta,
        precio_original: element.precio_original,
        des_pro: element.des_pro,
        ADESCTO: element.ADESCTO,
        des_IGV: element.des_IGV,
        iva: element.iva,
        Unidad: element.Unidad,
        descuento: element.descuento
      })
    });
    let save = await petitions.savePedido(encabezado, detalles);
    if (save.message) {
      alert(save.message);
      setTimeout(() => {
        props.Data.navigation.navigate('Customer')
      }, 9000);
    }

  }

  const realizarPedidoEcuador = async () => {
    let detalle = productos;
    let id3 = await AsyncStorage.getItem('usuario')
    let objectID3 = eval(id3);
    let encabezado = {
      CodUsua: objectID3[0].ID3,
      CodVend: CodVend,
      CodClie: nit,
      Descrip: nombreNegocio,
      CodUbic: selectedBodega,
      Direc1: direccion,
      Direc2: Direc2,
      Telef: telefono,
      ID3: ID3,
      monto: total,
    }
    if (detalle.length == 0) {
      alert('por favor, ingrese algun producto en detalle para continuar');
    } else {
      const data = await petitions.savePedido(encabezado, detalle)
      if (data.data[0].NUMEROD) {
        alert('se genero pedido correctamente. \n el numero de pedido es: ' + data.data[0].NUMEROD);
        setTimeout(() => {
          props.Data.navigation.navigate('Customer')
        }, 10000);
      }
    }
  }

  const PickersElement = item => {
    let pickers = item.map(data => (
      <Picker.Item label={data.name} value={data.id} />
    ));
    return pickers;
  };

  const loadBodegas = async () => {
    if (bool == 1) {
      try {
        const data = await petitions.getBodegas();
        setBodegas(PickersElement(data.data));
        setBool(0)
      }
      catch (e) {
        console.log(e)
        setBool(0)
      }
    }
  };

  useEffect(() => { loadBodegas(); }, [])

  useEffect(() => {
    console.log("bodega", selectedBodega);
    console.log("entrando");
    setProductos(p.products);
    showElement();
  }, [p, productos])

  return (
    <>
      <ScrollView style={{ width: '100%', backgroundColor: 'white' }}>
        <View style={[!shouldShow && { display: 'none' }]}>
          <View style={styles.content}>
            <Grid>
              <Col size={50}>
                <Row style={styles.cell}>
                  <Icon name="user" size={20} color="black" />
                  <Text style={styles.boldText}> Nombre</Text>
                </Row>
                <Row style={[styles.cell, styles.different]}>
                  <Icon name="id-card" size={20} color="black" />
                  <Text style={styles.boldText}> Nit</Text>
                </Row>
                <Row style={styles.cell}>
                  <Icon name="map-pin" size={20} color="black" />
                  <Text style={styles.boldText}> Ciudad</Text>
                </Row>
              </Col>
              <Col size={50}>
                <Row style={styles.cell}>
                  <Text>{nombreNegocio}</Text>
                </Row>
                <Row style={[styles.cell, styles.different]}>
                  <Text>{nit}</Text>
                </Row>
                <Row style={styles.cell}>
                  <Text>
                    {ciudadPoblacion}.{departamento}
                  </Text>
                </Row>
              </Col>
            </Grid>
          </View>

          <View style={styles.content}>
            <Grid>
              <Col size={50}>
                <Row style={[styles.cell, styles.different]}>
                  <Icon name="map-marker" size={20} color="black" />
                  <Text style={styles.boldText}> Dirección</Text>
                </Row>
                <Row style={styles.cell}>
                  <Icon name="phone" size={20} color="black" />
                  <Text style={styles.boldText}> Telefono</Text>
                </Row>
              </Col>
              <Col size={50}>
                <Row style={[styles.cell, styles.different]}>
                  <Text>{direccion}</Text>
                </Row>
                <Row style={styles.cell}>
                  <Text>{telefono}</Text>
                </Row>
              </Col>
            </Grid>
          </View>

          <View style={[styles.content, styles.contentSelect]}>
            <Grid>
              <Col size={32}>
                <Row style={[styles.cell, styles.different]}>
                  <Icon name="archive" size={20} color="black" />
                  <Text style={styles.boldText}> Bodega</Text>
                </Row>
              </Col>
              <Col size={50}>
                <Row style={[styles.cell, styles.different]}>
                  <Picker
                    style={styles.pickerStyle}
                    itemStyle={styles.dropdownBtnStyle}
                    mode="dropdown"
                    dropdownIconColor={'black'}
                    onValueChange={item => setSelectedBodega(item)}>
                    {bodegas}
                  </Picker>
                </Row>
              </Col>
            </Grid>
          </View>

          <View style={[styles.content, styles.contentSelect]}>
            <Grid>
              <Col size={32}>
                <Row style={[styles.cell, styles.different]}>
                  <Icon name="list-ul" size={20} color="black" />
                  <Text style={styles.boldText}> Lista de precio</Text>
                </Row>
              </Col>
              <Col size={50}>
                <Row style={[styles.cell, styles.different]}>
                  <Picker
                    style={styles.pickerStyle}
                    itemStyle={styles.dropdownBtnStyle}
                    mode="dropdown"
                    dropdownIconColor={'black'}
                    onValueChange={selected => AsyncStorage.setItem('precio', selected)}>
                    <Picker.Item label="Precio1" value="Precio1" />
                    <Picker.Item label="Precio2" value="Precio2" />
                    <Picker.Item label="Precio3" value="Precio3" />
                  </Picker>
                </Row>
              </Col>
            </Grid>
          </View>

          <View style={styles.content}>
            <Grid>
              <Col size={35}>
                <Row style={styles.cell}>
                  <Icon name="indent" size={20} color="black" />
                  <Text style={styles.boldText}> Observación</Text>
                </Row>
              </Col>
              <Col size={55}>
                <Row style={styles.cell}>
                  <TextInput style={styles.input} />
                </Row>
              </Col>
            </Grid>
          </View>

          <View style={[styles.content, styles.ajust]}>
            <Grid>
              <Col size={50}>
                <Row style={styles.cell}>
                  <Icon name="barcode" size={20} color="black" />
                  <Text style={styles.boldText}> Referencia en el pedido</Text>
                </Row>
                <Row style={[styles.cell, styles.different]}>
                  <Icon name="money" size={20} color="black" />
                  <Text style={styles.boldText}> Subtotal</Text>
                </Row>
                <Row style={styles.cell}>
                  <Icon name="money" size={20} color="black" />
                  <Text style={styles.boldText}> IVA</Text>
                </Row>
                <Row style={[styles.cell, styles.different]}>
                  <Icon name="money" size={20} color="black" />
                  <Text style={styles.boldText}> Total</Text>
                </Row>
              </Col>
              <Col size={50}>
                <Row style={styles.cell}>
                  <Text>{referencias}</Text>
                </Row>
                <Row style={[styles.cell, styles.different]}>
                  <Text>{total}</Text>
                </Row>
                <Row style={styles.cell}>
                  <Text>0</Text>
                </Row>
                <Row style={[styles.cell, styles.different]}>
                  <Text>{total}</Text>
                </Row>
              </Col>
            </Grid>
          </View>

          <Button
            style={{ marginTop: 10 }}
            disabled={shouldSave}
            onPress={() => realizarPedidoEcuador()}
            title="Guardar"
            color="#6495ED"
          />
        </View>

        <View style={[shouldShow && { display: 'none' }]}>

          <View style={styles.content_peru}>
            <Grid>
              <Col size={40}>
                <Row style={styles.cell}>
                  <Icon name="user" size={20} color="black" />
                  <Text style={styles.boldText}> Raz. Social</Text>
                </Row>
                <Row style={[styles.cell, styles.different]}>
                  <Icon name="id-card" size={20} color="black" />
                  <Text style={styles.boldText}> Nit</Text>
                </Row>
                <Row style={styles.cell}>
                  <Icon name="map-pin" size={20} color="black" />
                  <Text style={styles.boldText}> Ciudad</Text>
                </Row>
              </Col>
              <Col size={60}>
                <Row style={styles.cell}>
                  <Text>{nombre}</Text>
                </Row>
                <Row style={[styles.cell, styles.different]}>
                  <Text>{cod}</Text>
                </Row>
                <Row style={styles.cell}>
                  <Text>
                    {ciudadPoblacion}.{departamento}
                  </Text>
                </Row>
              </Col>
            </Grid>
          </View>

          <View style={styles.content_peru}>
            <Grid>
              <Col size={40}>
                <Row style={[styles.cell, styles.different]}>
                  <Icon name="map-marker" size={20} color="black" />
                  <Text style={styles.boldText}> Dirección</Text>
                </Row>
                <Row style={styles.cell}>
                  <Icon name="money" size={20} color="black" />
                  <Text style={styles.boldText}> Moneda</Text>
                </Row>
                <Row style={[styles.cell, styles.different]}>
                  <Icon name="phone" size={20} color="black" />
                  <Text style={styles.boldText}> Telefono</Text>
                </Row>
              </Col>
              <Col size={60}>
                <Row style={[styles.cell, styles.different]}>
                  <Text>{direccion}</Text>
                </Row>
                <Row style={styles.cell}>
                    <Picker
                      style={styles.pickerStylePeru}
                      onValueChange={(itemValue) => setSelectedMoneda(itemValue)}>
                      <Picker.Item label={moncre} value={moncre} />
                    </Picker>
                </Row>
                <Row style={[styles.cell, styles.different]}>
                  <Text>{telefono}</Text>
                </Row>
              </Col>
            </Grid>
          </View>

          <View style={[styles.content_peru, styles.contentSelect]}>
            <Grid>
              <Col size={32}>
                <Row style={styles.cell}>
                  <Icon name="barcode" size={20} color="black" />
                  <Text style={styles.boldText}>Doc.Ref Pedido</Text>
                </Row>
              </Col>
              <Col size={34}>
                <Row style={styles.cell}>
                  <TextInput style={styles.input_pedido} onChangeText={onChangeNumDoc} value={numDoc} />
                </Row>
              </Col>
            </Grid>
          </View>

          <View style={[styles.content_peru, styles.contentSelect]}>
            <Grid>
              <Col size={32}>
                <Row style={[styles.cell, styles.different]}>
                  <Icon name="list-ul" size={20} color="black" />
                  <Text style={styles.boldText}> Lista de precio</Text>
                </Row>
              </Col>
              <Col size={50}>
                <Row style={[styles.cell, styles.backgroundColor_different]}>
                    <Picker
                      style={[styles.pickerStylePeru,styles.backgroundColor_grey]}
                      onValueChange={item => setPrecio(item)}>
                      <Picker.Item
                        itemStyle={styles.dropdownRowTxtStyle}
                        label={ctipre}
                        value={ctipre}
                      />
                    </Picker>
                </Row>
              </Col>
            </Grid>
          </View>

          <View style={styles.content_peru}>
            <Grid>
              <Col size={35}>
                <Row style={styles.cell}>
                  <Icon name="indent" size={20} color="black" />
                  <Text style={styles.boldText}> Observación</Text>
                </Row>
              </Col>
              <Col size={55}>
                <Row style={styles.cell}>
                  <TextInput style={styles.input} onChangeText={onChangeText} value={text} />
                </Row>
              </Col>
            </Grid>
          </View>

          <View style={[styles.content_peru, styles.ajust]}>
            <Grid>
              <Col size={50}>
                <Row style={[styles.cell, styles.different]}>
                  <Icon name="barcode" size={20} color="black" />
                  <Text style={styles.boldText}> Referencia en el pedido</Text>
                </Row>
                <Row style={styles.cell}>
                  <Icon name="money" size={20} color="black" />
                  <Text style={styles.boldText}> Total Bruto</Text>
                </Row>
                <Row style={[styles.cell, styles.different]}>
                  <Icon name="money" size={20} color="black" />
                  <Text style={styles.boldText}> Total Descuento</Text>
                </Row>
                <Row style={styles.cell}>
                  <Icon name="money" size={20} color="black" />
                  <Text style={styles.boldText}> TotalV. Venta</Text>
                </Row>
                <Row style={[styles.cell, styles.different]}>
                  <Icon name="money" size={20} color="black" />
                  <Text style={styles.boldText}> Total I.G.V</Text>
                </Row>
                <Row style={styles.cell}>
                  <Icon name="money" size={20} color="black" />
                  <Text style={styles.boldText}> TotalP. Venta</Text>
                </Row>
                <Row style={[styles.cell, styles.different]}>
                  <Icon name="money" size={20} color="black" />
                  <Text style={styles.boldText}> Total</Text>
                </Row>
              </Col>
              <Col size={50}>
                <Row style={[styles.cell, styles.different]}>
                  <Text>{referencias}</Text>
                </Row>
                <Row style={styles.cell}>
                  <Text>{total_bruto}</Text>
                </Row>
                <Row style={[styles.cell, styles.different]}>
                  <Text>{total_desc}</Text>
                </Row>
                <Row style={styles.cell}>
                  <Text>{totav_venta}</Text>
                </Row>
                <Row style={[styles.cell, styles.different]}>
                  <Text>{total_igv}</Text>
                </Row>
                <Row style={styles.cell}>
                  <Text>{totalp_venta}</Text>
                </Row>
                <Row style={[styles.cell, styles.different]}>
                  <Text>{totalV}</Text>
                </Row>
              </Col>
            </Grid>
          </View>

          <Button
            style={{ marginTop: 10 }}
            disabled={shouldSave}
            onPress={() => realizarPedido()}
            title="Guardar"
            color="#6495ED"
          />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  cell: {
    borderWidth: 0,
    borderColor: '#ddd',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  content: {
    width: '100%',
    height: 145,
    padding: 5,
  },
  contentSelect: {
    height: 73,
  },
  input: {
    height: 80,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#0098D3',
    borderRadius: 5,
    width: '83%',
    marginBottom: 10,
    color: '#000',
    marginLeft: 60,
    paddingHorizontal: 15,
    marginTop: 4,
  },
  tinyLogo: {
    width: 100,
    height: 100,
    marginTop: -20,
    marginLeft: 10,
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
  boldText: {
    fontWeight: 'bold',
  },
  different: {
    backgroundColor: '#D3D3D3',
  },
  ajust: {
    height: 160,
  },
  pickerStyle: {
    width: '85%',
    height: 5,
    color: 'black',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#D3D3D3',
    marginLeft: 50
  },
  card: {
    borderWidth: 1,
    width: 170,
    borderColor: 'black',
    borderRadius: 10,
    backgroundColor: 'white',
    marginLeft: 35,
  },
  content_peru: {
    width: '100%',
    height: 220,
    padding: 2,
  },
  input_pedido: {
    height: 35,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#0098D3',
    borderRadius: 5,
    width: '100%',
    marginBottom: 10,
    color: '#000',
    marginTop: 4,
  },
  black: {
    color: "black"
  },
  pickerStylePeru: {
    width: '97%',
    height: 5,
    color: 'black',
    justifyContent: 'center',
    textAlign: 'center',
  },
  backgroundColor_different: {
    backgroundColor: '#D3D3D3',
  }
});
