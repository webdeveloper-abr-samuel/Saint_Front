import React, { useState } from 'react';
import {
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
} from 'react-native';
import { Requests } from '../../api';

const petitions = new Requests()

export default function LoginForm({ navigation: { navigate } }) {
    const [formData, setformData] = useState(defaultValue());
    const recovered = async () => {
        try {
            if (formData.password == formData.new_password) {
                if (formData.password.length >= 8) {
                    const data = await petitions.newPass(formData.usuario, formData.password);
                    if (data[1] == 1) {
                        alert('se ha creado la contraseña correctamente')
                        setTimeout(function () {
                            navigate('Login');
                        }, 2000)
                    }
                    else {
                        alert('no se pudo guardar la nueva contraseña, por favor intentelo de nuevo')
                    }

                }
                else {
                    alert('la contraseña debe contener almenos 8 caracteres')
                }
            }
            else {
                alert('la constraseña no coincide')
            }
        }
        catch (error) {
            alert(JSON.stringify(error))
        }
    };


    const onChange = (e, type) => {
        setformData({ ...formData, [type]: e.nativeEvent.text });
    };

    return (
        <>
            <SafeAreaView style={styles.background}>
                <View style={styles.view}>
                    <Text style={styles.title}>Sistemas Pedidos Abracol Saint</Text>
                    <Text style={styles.title_card}>Actualizar Contraseña</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Usuario"
                        placeholderTextColor="black"
                        secureTextEntry={false}
                        onChange={e => onChange(e, 'usuario')}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Nueva Contraseña"
                        placeholderTextColor="black"
                        secureTextEntry={true}
                        onChange={e => onChange(e, 'password')}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Confirmar Contraseña"
                        placeholderTextColor="black"
                        secureTextEntry={true}
                        onChange={e => onChange(e, 'new_password')}
                    />

                    <TouchableOpacity style={styles.touch} onPress={recovered}>
                        <Text style={styles.btnText}>Confirmar</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </>
    );
}

function defaultValue() {
    return {
        password: '',
        new_password: '',
    };
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
    title_card: {
        textAlign: 'center',
        color: 'black',
        width: '100%',
        fontSize: 20,
        padding: 5,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 20,
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
});