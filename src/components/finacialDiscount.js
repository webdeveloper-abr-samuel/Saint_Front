import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    Image
} from 'react-native';
import Header from './Layouts/Header'
import { Col, Row, Grid } from 'react-native-easy-grid';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            factura: 0,
            subTotal: 0,
            discount: 0,
            total: 0
        };
    }

    chageFactura = (factura) => {
        const subTotal = (factura / 1.18).toFixed(2);
        const discount = (subTotal * 0.03).toFixed(2);
        const total = (factura - discount).toFixed(2);
        this.setState({ subTotal });
        this.setState({ discount });
        this.setState({ total });
        this.setState({ factura })
    };

    render() {
        return (
            <>
                <Header />
                <View style={styles.container}>
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder="valor de la factura"
                            value={this.state.factura}
                            onChangeText={(number) => this.chageFactura(number)}
                        />
                    </View>

                    <View style={[styles.content, styles.ajust]}>
                        <Grid>
                            <Col size={70}>
                                <Row style={[styles.cell, styles.different]}>
                                    <Text style={styles.boldText}> Factura</Text>
                                </Row>
                                <Row style={[styles.cell]}>
                                    <Text style={styles.boldText}> Subtotal</Text>
                                </Row>
                                <Row style={[styles.cell, styles.different]}>

                                    <Text style={styles.boldText}> Dsct. Financiero</Text>
                                </Row>
                                <Row style={[styles.cell]}>

                                    <Text style={styles.boldText}> Total a Pagar</Text>
                                </Row>
                            </Col>
                            <Col size={30}>
                                <Row style={[styles.cell, styles.different]}>
                                    <Text style={styles.spaceItem}>{this.state.factura}</Text>
                                </Row>
                                <Row style={[styles.cell]}>
                                    <Text style={styles.spaceItem}>{this.state.subTotal}</Text>
                                </Row>
                                <Row style={[styles.cell, styles.different]}>
                                    <Text style={styles.spaceItem}>{this.state.discount}</Text>
                                </Row>
                                <Row style={[styles.cell]}>
                                    <Text style={styles.spaceItem}>{this.state.total}</Text>
                                </Row>
                            </Col>
                        </Grid>
                    </View>

                    <View style={{left: 0, right: 0, alignItems: "center", marginTop: 50}}>
                        <Image
                            style={styles.logo}
                            source={require('../assets/money-bag.png')}
                        />
                    </View>
                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 5,
        backgroundColor: 'white',
    },
    spaceItem: {
        paddingVertical: 5,
    },
    titles: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    input: {
        height: 50,
        color: 'black',
        marginBottom: 20,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        borderRadius: 6,
        fontSize: 18,
        borderWidth: 2,
        borderColor: '#FFD101',
    },
    cell: {
        borderWidth: 0,
        borderColor: '#ddd',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    content: {
        width: '100%',
        height: 250,
        padding: 5
    },
    different: {
        backgroundColor: '#D3D3D3',
    },
});

export default App;