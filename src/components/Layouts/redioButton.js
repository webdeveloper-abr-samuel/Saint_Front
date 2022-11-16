import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default class RadioButton extends Component {
     state = {
          value: '',
          active: true
     };

     componentDidMount() {
          const { val, active } = this.props
          this.setState({ value: val, active });
     }

     componentDidUpdate(prevProps, prevState, snapshot) {
          if (prevState.value != this.props.val) {
               const { val } = this.props
               this.setState({ value: val });
          }

     }

     render() {
          const { value, active } = this.state
          const { PROP, handleToUpdate, width, height, direction } = this.props

          return (
               <View style={{ flexDirection: direction }}>
                    {PROP.map(res => {
                         return (
                              <View key={res.key} style={styles.container}>
                                   <TouchableOpacity
                                        style={[styles.radioCircle, {width}, {height}]}
                                        disabled={active}
                                        onPress={() => {
                                             this.setState({value: res.key});
                                             handleToUpdate(res.key)
                                        }}>
                                        {value === res.key && <View style={[styles.selectedRb, {width}]} />}
                                        <Text style={styles.radioText}>{res.text}</Text>
                                   </TouchableOpacity>
                              </View>
                         );
                    })}
               </View>
          );
     }
}

const styles = StyleSheet.create({
     container: {
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 15
     },
     radioText: {
          fontSize: 20,
          color: '#fff',
     },
     radioCircle: {
          height: 45,
          borderRadius: 5,
          borderWidth: 2,
          borderColor: '#0098D3',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 2,
          backgroundColor: '#286090'
     },
     selectedRb: {
          height: 39,
          borderRadius: 5,
          borderWidth: 3,
          borderColor: '#204d74',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 2,
          backgroundColor: '#204d74',
          position: 'absolute'
     },
     result: {
          marginTop: 20,
          color: 'white',
          fontWeight: '600',
          backgroundColor: '#F3FBFE',
     },
});