import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    ScrollView
} from 'react-native';
import { Requests } from '../../api';
import Header from './Layouts/Header'
const petitions = new Requests()

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Reports: [],
            Nit: '',
            Name: '',
            Total: 0,
            LimCredit: 0,
            StatusClient: ''
        };
        this.loadStatusReport()
    }

    sum(arr ,key) {
        return arr.reduce((a, b) => a + (b[key] || 0), 0);
    }

    loadStatusReport = async () => {
        try {
            const data = await petitions.getStatuReport();
            const balanceTotal = this.sum(data.data,'CDOSALDO');
            const statusC = data.data[0].CESTADO == 'V' ? 'SI' : 'NO'
            this.setState({ Reports: data.data });
            this.setState({Nit : data.data[0].CDOCODCLI});
            this.setState({Name : data.data[0].CNOMCLI});
            this.setState({ Total: balanceTotal.toFixed(2) });
            this.setState({ LimCredit: data.data[0].LMCRMN.toFixed(2) });
            this.setState({ StatusClient: statusC });
        } catch (err) {
            console.log(err);
        }
    };

    renderItem = ({ item, index }) => {
        const {CDODOCUMEN,CDOTIPMON, CDOFECDOC, CDOTIPCAM, CDOIMPORTE, CDOFECVEN, CDOSALDO, CDONROREF, DIAS} = item;
        return (
            <>
                <ScrollView style={{ width: '100%', backgroundColor: 'white' }}>
                    <Text style={[styles.titleCount]}>Cuenta # {index + 1 } - N. Referencia : {CDONROREF}</Text>
                    <View style={styles.row}>
                        <View style={styles.column}>
                            <Text style={[styles.spaceItem, styles.titles]}>Documento</Text>
                            <Text style={styles.spaceItem}>{CDODOCUMEN}</Text>
                            <Text style={[styles.spaceItem, styles.titles]}>Fecha Emision</Text>
                            <Text style={styles.spaceItem}>{CDOFECDOC}</Text>
                            <Text style={[styles.spaceItem, styles.titles]}>Fecha Vencim.</Text>
                            <Text style={styles.spaceItem}>{CDOFECVEN}</Text>
                            <Text style={[styles.spaceItem, styles.titles]}>Situación</Text>
                            <Text style={styles.spaceItem}>FACTURA EN CARTERA(MN)</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={[styles.spaceItem, styles.titles]}>T.M.</Text>
                            <Text style={styles.spaceItem}>{CDOTIPMON}</Text>
                            <Text style={[styles.spaceItem, styles.titles]}>T/C</Text>
                            <Text style={styles.spaceItem}>{CDOTIPCAM}</Text>
                            <Text style={[styles.spaceItem, styles.titles]}>Importe</Text>
                            <Text style={styles.spaceItem}>{CDOIMPORTE}</Text>
                            <Text style={[styles.spaceItem, styles.titles]}>Saldo MN</Text>
                            <Text style={styles.spaceItem}>{CDOSALDO}</Text>
                        </View>
                    </View>
                    <Text style={[styles.titleCountEnd]}>Dias: {DIAS}</Text>
                </ScrollView>
            </>
        );
    };

    render() {
        return (
            <>
                <Header />
                <View style={styles.container}>
                    <Text style={styles.mainTitle}>Estado de Cuenta Pendiente por Cliente</Text>
                    <View style={[styles.row, styles.rowName]}>
                        <View style={styles.column}>
                            <Text style={[styles.spaceItem, styles.titles]}>Nombre</Text>
                            <Text style={styles.spaceItem}>{this.state.Name}</Text>
                        </View>
                    </View>
                    <View style={[styles.row, styles.rowMain]}>
                        <View style={styles.column}>
                            <Text style={[styles.spaceItem, styles.titles]}>Activo</Text>
                            <Text style={styles.spaceItem}>{this.state.StatusClient}</Text>
                            <Text style={[styles.spaceItem, styles.titles]}>Cliente Inicial</Text>
                            <Text style={styles.spaceItem}>{this.state.Nit}</Text>
                            <Text style={[styles.spaceItem, styles.titles]}>Cliente Final</Text>
                            <Text style={styles.spaceItem}>{this.state.Nit}</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={[styles.spaceItem, styles.titles]}>Limite de Credito</Text>
                            <Text style={styles.spaceItem}>{this.state.LimCredit}</Text>
                            <Text style={[styles.spaceItem, styles.titles]}>Disponible</Text>
                            <Text style={styles.spaceItem}>{(this.state.LimCredit - this.state.Total).toFixed(2)}</Text>
                            <Text style={[styles.spaceItem, styles.titles]}>Total</Text>
                            <Text style={styles.spaceItem}>{this.state.Total}</Text>
                        </View>
                    </View>
                    <View style={styles.rowFlatlist} >
                        <FlatList
                            numColumns={1}
                            style={{ backgroundColor: 'white' }}
                            keyExtractor={item => item.CDONRODOC}
                            data={this.state.Reports}
                            renderItem={this.renderItem}
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
        paddingTop: 5,
        paddingHorizontal: 5,
        backgroundColor: 'white',
    },
    row: {
        flex: 2/3,
        flexDirection: "row",
        alignItems: 'center',
        paddingHorizontal: 35,
        paddingVertical: 10,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderLeftColor: '#FFD101',
        borderRightColor: '#FFD101',
        borderBottomColor: '#FFD101'
    },
    rowName: {
        top: -25,
        borderBottomWidth: 0
    },
    rowMain: {
        top: -38
    },
    column: {
        flex: 2,
        flexDirection: "column",
        alignItems: 'center',
        marginBottom: 15
    },
    rowFlatlist: {
        flex: 2,
        flexDirection: "row",
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FFD101',
        paddingVertical: 5,
        borderWidth: 0
    },
    spaceItem: {
        paddingVertical: 5,
    },
    titles: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    mainTitle: {
        textAlign: 'center',
        color: 'black',
        width: '100%',
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: '#FAC227'
    },
    titleCount: {
        textAlign: 'center',
        color: 'black',
        width: '100%',
        fontSize: 15,
        padding: 5,
        fontWeight: 'bold',
        backgroundColor: '#FAC227',
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3
    },
    titleCountEnd: {
        textAlign: 'center',
        color: 'black',
        width: '100%',
        fontSize: 15,
        padding: 4,
        fontWeight: 'bold',
        backgroundColor: '#FAC227',
        marginBottom: 15,
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3
    },
});

export default App;