import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    FlatList,
    AsyncStorage
} from 'react-native';
import { Requests } from '../../api';
import Header from './Layouts/Header'
const petitions = new Requests()

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Clients: [],
        };
        this.loadClient()
    }

    loadClient = async () => {
        try {
            const data = await petitions.getStatusClients('');
            this.setState({Clients: data.data});
        } catch (err) {
            console.log(err);
        }
    };

    pressHandler = (CDOCODCLI) => {
        AsyncStorage.setItem('CDOCODCLI', CDOCODCLI)
        this.props.navigation.navigate('ReportCount')
    };

    renderItem = ({ item }) => {
        return (
            <>
                <TouchableOpacity onPress={() => this.pressHandler(item.CDOCODCLI)}>
                    <View style={styles.card}>
                        <Text style={styles.title}>{item.CDOCODCLI}</Text>
                        <Text style={styles.item}>{item.CNOMCLI}</Text>
                    </View>
                </TouchableOpacity>
            </>
        );
    };

    render() {
        return (
            <>
                <Header />
                <View style={styles.container}>
                    <FlatList
                        numColumns={1}
                        style={{ backgroundColor: 'white' }}
                        keyExtractor={item => item.nit}
                        data={this.state.Clients}
                        renderItem={this.renderItem}
                    />
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 5,
        paddingHorizontal: 5,
        backgroundColor: 'white',
    },
    item: {
        flex: 1,
        padding: 15,
        color: 'black',
        backgroundColor: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    title: {
        textAlign: 'left',
        color: 'black',
        fontSize: 18,
        padding: 4,
        fontWeight: 'bold',
        backgroundColor: '#FFDE40',
    },
    card: {
        backgroundColor: 'white',
        marginBottom: 12,
        marginTop: 12,
        borderWidth: 1,
        borderColor: 'lightgrey'
    },
    detailCard: {
        fontSize: 13,
        marginLeft: 20,
        marginBottom: 5
    },
    address: {
        fontWeight: 'bold',
        paddingLeft: 15
    },
    textInputStyle: {
        height: 50,
        borderWidth: 1,
        paddingLeft: 20,
        borderColor: '#009688',
        backgroundColor: 'white',
        color: 'black'
    }
});

export default App;