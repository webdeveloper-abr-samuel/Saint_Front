import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, FlatList , AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from './Layouts/Header';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showList: true
    };
    this.contryOption();
  }

  Opcions = data => {
    switch (data) {
      case 'Ingreso de Ordenes':
        this.props.navigation.navigate('Customer');
        break;
      case 'Estados de Cuenta':
        this.props.navigation.navigate('Count');
        break;
      case 'Descuento Financiero':
        this.props.navigation.navigate('FinancialDiscount');
        break;
      case 'Iniciar Venta SellOut':
        this.props.navigation.navigate('Iniciar Venta SellOut');
        break;
      case 'Resumen de Ejecucion':
        this.props.navigation.navigate('Resumen de Ejecucion');
        break;
      default:
        break;
    }
  };

  renderItem = ({ item }) => {
    return (
      <>
        <TouchableOpacity onPress={() => this.Opcions(item.name)}>
          <View style={styles.card}>
            <View style={styles.title}>
              <Text style={styles.textTitle}>{item.name}</Text>
              <Icon style={styles.textIcon} name={item.icon} size={30} />
            </View>
            <View style={styles.icons}>
              <Text numberOfLines={2} style={styles.detailCard}>
                <Icon name="arrow-circle-right" size={20} color="#FAC227" />
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  contryOption =  async () => {
    var country = await AsyncStorage.getItem('country')
    console.log("contry", country);
    if (country == 1) {
      this.setState({ showList : true })
    }
    if (country == 2) {
      this.setState({ showList : false })
    }
  }

  render() {
    return (
      <>
        <Header />
        <View style={styles.view}>
          <View style={[!this.state.showList && { display: 'none' }]}>
            <FlatList
              numColumns={1}
              style={{ backgroundColor: 'white' }}
              keyExtractor={item => item.id}
              renderItem={this.renderItem}
              data={[
                { name: 'Ingreso de Ordenes', icon: 'shopping-cart', id: 1 },
                { name: 'Estados de Cuenta', icon: 'money', id: 2 },
                { name: 'Descuento Financiero', icon: 'money', id: 3 },
                { name: 'Iniciar Venta SellOut', icon: 'street-view', id: 4 },
                { name: 'Resumen de Ejecucion', icon: 'tasks', id: 5 },
              ]}
            />
          </View>
          <View style={[this.state.showList && { display: 'none' }]}> 
            <FlatList
              numColumns={1}
              style={{ backgroundColor: 'white' }}
              keyExtractor={item => item.id}
              renderItem={this.renderItem}
              data={[
                { name: 'Ingreso de Ordenes', icon: 'shopping-cart', id: 1 },
                { name: 'Iniciar Venta SellOut', icon: 'street-view', id: 2 },
                { name: 'Resumen de Ejecucion', icon: 'tasks', id: 3 }
              ]}
            />
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingTop: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    height: '100%',
  },
  title: {
    backgroundColor: '#FFD101',
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
  },
  textTitle: {
    position: 'absolute',
    color: 'black',
    fontSize: 19,
    padding: 4,
    fontWeight: 'bold',
    marginLeft: 50,
    marginTop: 7,
  },
  textIcon: {
    paddingVertical: 10,
    paddingLeft: 5,
    color: 'black',
  },
  card: {
    backgroundColor: 'white',
    marginHorizontal: 5,
    marginBottom: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#FFD101',
    borderRadius: 10,
  },
  icons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
  },
  detailCard: {
    marginVertical: 5,
    paddingRight: 5,
  },
  logo: {
    width: '30%',
    height: 30,
    marginLeft: 6,
    marginVertical: 10,
  },
  navBar: {
    backgroundColor: 'black',
    width: '100%',
    height: 60,
  },
  version: {
    color: 'white',
    position: 'absolute',
    left: 210,
    top: 19,
    fontSize: 15,
  },
});

export default App;