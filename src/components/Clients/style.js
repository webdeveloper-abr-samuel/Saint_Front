'use strict';
import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
     input: {
          height: 40,
          width: '100%',
          backgroundColor: '#fff',
          borderWidth: 1,
          borderColor: '#0098D3',
          borderRadius: 5,
          marginBottom: 10,
          color: 'black',
          marginTop: 4,
     },
     content: {
          flex: 1,
          paddingHorizontal: 20,
          paddingVertical: 20,
          alignContent: 'center',
          alignItems: 'flex-start',
          backgroundColor: 'white',
     },
     pickerStyle: {
          width: '100%',
          height: 40,
          color: 'white',
          justifyContent: 'center',
          textAlign: 'center',
          borderColor: '#0098D3',
          borderRadius: 5,
          marginBottom: 10,
          marginTop: 4,
          backgroundColor: '#286090'
     },
     CheckBox: {
          width: '95%',
          marginVertical: 10
     },
     flatlistContent: {
          backgroundColor: 'white',
          marginTop: 5,
          marginBottom: 20,
          width: '100%',
     },
     header: {
          backgroundColor: '#fff',
          shadowColor: '#333333',
          shadowRadius: 2,
          shadowOpacity: 0.1,
          paddingTop: 20,
     },
     panelHeader: {
          alignItems: 'center',
     },
     panelHandle: {
          width: 50,
          height: 8,
          borderRadius: 4,
          backgroundColor: '#00000040',
          marginBottom: 10,
     },
     panel: {
          paddingTop: 10,
          paddingLeft: 20,
          backgroundColor: '#fff',
          shadowColor: '#000000',
          shadowOpacity: 0.1,
     },
     panelTitle: {
          paddingTop: 5,
          fontSize: 15,
     },
     panelButton: {
          padding: 10,
          borderRadius: 10,
          backgroundColor: '#FF6347',
          alignItems: 'center',
          marginVertical: 7,
     },
     panelButtonTitle: {
          fontSize: 17,
          fontWeight: 'bold',
          color: 'white',
     },
     contentButton: {
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginLeft: -5,
          marginTop: 10
     },
     principalbutton: {
          padding: 10,
          borderRadius: 5,
          backgroundColor: '#286090',
          alignItems: 'center',
          marginVertical: 8,
          marginLeft: 5
     },
     CheckBoxBrands: {
          width: '30%'
     },
     //modal
     centeredView: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 22,
     },
     modalView: {
          marginLeft: 8,
          marginVertical: 5,
          backgroundColor: "white",
          borderRadius: 20,
          padding: 8,
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: {
               width: 0,
               height: 2
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
          width: 585
     },
     button: {
          borderRadius: 10,
          marginBottom: 10,
          padding: 10,
          elevation: 2,
          width: 510,
          textAlign: 'center',
          alignItems: 'center'
     },
     buttonShowModal: {
          borderRadius: 10,
          marginTop: 10,
          padding: 10,
          elevation: 2,
          width: 150,
          textAlign: 'center',
          alignItems: 'center',
          margin: 5
     },
     buttonOpen: {
          backgroundColor: "#286090",
     },
     buttonClose: {
          backgroundColor: "tomato",
     },
     buttonSuccess: {
          backgroundColor: "#286090",
     },
     textStyle: {
          color: "white",
          fontWeight: "bold"
     },
     modalText: {
          marginBottom: 15,
          width: 510
     },
     address: {
          backgroundColor: "#286090",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: {
               width: 0,
               height: 2
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          width: 545,
          height: 50,
          textAlignVertical: 'center',
          textAlign: 'center',
          alignContent: 'center',
          marginTop: 20,
          borderRadius: 10,
          color: 'white',
          fontSize: 16
     },
     //Gestion Diaria
     titleHeader: {
          backgroundColor: '#D3D3D3',
          alignItems: 'center',
          textAlign: 'center',
          width: '100%',
          height: 70,
          borderColor: 'grey',
          borderWidth: 1,
          textAlignVertical: 'center',
          fontSize: 16
     },
     labels: {
          fontWeight: 'bold',
          marginTop: 20,
          textAlign: 'center',
          alignItems: 'center',
          alignContent: 'center',
     },
     contentManagement: {
          flex: 1,
          paddingHorizontal: 20,
          paddingVertical: 20,
          alignContent: 'center',
          backgroundColor: 'white',
          textAlign: 'center',
          alignItems: 'center',
          alignContent: 'center',
     },
     ScrollReason: {
          backgroundColor: 'white',
          alignContent: 'center',
          flexGrow: 1 ,
          height: '100%'
     }
});