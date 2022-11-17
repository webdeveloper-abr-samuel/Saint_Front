import React, { Component } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  AsyncStorage
} from 'react-native';
import { Requests } from '../../../api';
const petitions = new Requests()
const countries = ['Peru', 'Ecuador'];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
      formData: []
    };
  }

  defaultValue() {
    return {
      user: '',
      password: '',
    };
  }

  login = async () => {
    const { navigate } = this.props.navigation
    let user = this.state.formData.user;
    let password = this.state.formData.password;
    let country = this.state.selected;
    if (user == '' || password == '' || country == '') {
      alert('hay campos sin diligenciar')
    } else {
      if (country == 'Peru') {
        await AsyncStorage.setItem('country', '1')
        console.log('entrando');
        const data = await petitions.login(user, password);
        if (data[0].USU_ESTADO) {
          AsyncStorage.setItem('usuario', user)
          AsyncStorage.setItem('vendedor', data[0].CTUVEND)
          AsyncStorage.setItem('email', data[0].EMAIL)
          navigate('Menu');
        }
      }
      if (country == 'Ecuador') {
        
        AsyncStorage.setItem('country', '2')
        console.log("entrando");
        const data = await petitions.login(user, password);
        if (data.length > 0) {
          if (data[0].new == 1) {
            AsyncStorage.setItem('usuario', data[0].ID3)
            alert('debe crear una constraseña para su usuario')
            setTimeout(function () {
              navigate('newPass');
            }, 2000)

          }
          else {
            AsyncStorage.setItem('usuario', JSON.stringify(data))
            navigate('Menu')
          }
        }

      }
    }
  };

  onChange = (e, type) => {
    this.state.formData = { ...this.state.formData, [type]: e.nativeEvent.text }
  };

  render() {
    return (
      <>
        <SafeAreaView style={styles.background}>
          <View style={styles.view}>
            <Text style={styles.title}>Sistemas Pedidos Abracol</Text>
            <Image
              style={styles.logo}
              source={require('../../assets/logo.png')}
            />

            <TextInput
              style={styles.input}
              placeholder="Usuario"
              placeholderTextColor="black"
              onChange={e => this.onChange(e, 'user')}
            />

            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="black"
              secureTextEntry={true}
              onChange={e => this.onChange(e, 'password')}
            />

            <View style={styles.checkboxContainer}>
              <SelectDropdown
                data={countries}
                onSelect={selectedItem => {
                  return this.state.selected = selectedItem;
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
                buttonStyle={styles.input}
                buttonTextStyle={styles.dropdownBtnTxtStyle}
                dropdownStyle={styles.dropdownDropdownStyle}
                rowStyle={styles.dropdownRowStyle}
                rowTextStyle={styles.dropdownRowTxtStyle}
              />
            </View>
            <TouchableOpacity style={styles.touch} onPress={this.login}>
              <Text style={styles.btnText}>Iniciar Sesión</Text>
            </TouchableOpacity>
            <Text>Sistemas Pedidos Abracol V.1.7</Text>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FFD101',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    height: 50,
    color: 'black',
    width: '80%',
    marginBottom: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    borderRadius: 6,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#1E3040',
  },
  btnText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 7,
  },
  view: {
    position: 'absolute',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 45,
    borderColor: '#FAC227',
    height: 'auto',
    width: 'auto'
  },
  logo: {
    marginTop: 40,
    marginBottom: 50,
    width: 310,
    height: 80,
  },
  title: {
    textAlign: 'center',
    color: 'black',
    width: '100%',
    fontSize: 20,
    padding: 5,
    fontWeight: 'bold',
    backgroundColor: '#FAC227',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
  },
  touch: {
    backgroundColor: '#FAC227',
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 20,
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
  btnText_pass: {
    color: 'black',
    fontSize: 13,
    fontWeight: 'bold',
    padding: 5,
  },
});


export default App;