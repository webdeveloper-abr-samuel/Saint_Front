import axios from 'axios'
import { AsyncStorage } from 'react-native';
import moment from "moment";
const ECUADOR = 'http://25.43.158.218:802/consultant'
const localPeru = 'http://25.39.100.183:3000/abraperu';

const headers = {
    'Access-Control-Allow-Origin': '*',
    "Access-Control-Allow-Method": '*',
    'Content-Type': 'application/json; charset=utf-8',
    'Accept': "application/json"
}
export class Requests {
    getBodegas = async () => {
        var country = await AsyncStorage.getItem('country')
        let res
        if (country == 1) {
            res = await axios.get(`${PERU}/storage`, { headers: headers })
        }
        if (country == 2) {
            res = await axios.get(`${ECUADOR}/storage`, { headers: headers })
        }
        return res.data
    }

    getCustomers = async (query) => {
        var country = await AsyncStorage.getItem('country')
        var CVENDE = await AsyncStorage.getItem('vendedor')
        const value = {
            query,
            CVENDE
        }
        let res
        if (country == 1) {
            res = await axios.post(`${localPeru}/clients`, value, { headers: headers });
        }
        else if (country == 2) {
            res = await axios.post(`${ECUADOR}/clients`, value, { headers: headers })
        }
        else if (country == 3) {
            res = await axios.post(`${TEST}/getCliente`, value, { headers: headers })
        }
        return res.data
    }

    login = async (user, pass) => {
        var country = await AsyncStorage.getItem('country')
        try {
            const value = {
                usuario: user,
                pass: pass
            }
            let res
            if (country == 1) {
                res = await axios.post(`${localPeru}/clients/login`, value, { headers: headers })
                AsyncStorage.setItem('TOKEN', res.data.token)
                AsyncStorage.setItem('AUTHTOKEN', res.data.authToken)
            }
            if (country == 2) {
                res = await axios.post(`${ECUADOR}/login`, value, { headers: headers })
                AsyncStorage.setItem('TOKEN', res.data.token)
                AsyncStorage.setItem('AUTHTOKEN', res.data.authToken)
            }
            return res.data.data
        }
        catch (error) {
            return error
        }
    }

    getProducts = async (query) => {
        var country = await AsyncStorage.getItem('country');
        var tprecio = await AsyncStorage.getItem('tprecio');
        var tmoneda = await AsyncStorage.getItem('tmoneda');
        let url
        if (country == 1) {
            const value = { COD_LISPRE: tprecio, ACODMON: tmoneda, query }
            url = await axios.post(`${localPeru}/products/all`, value, { headers: headers });
        }
        if (country == 2) {
            const value = { query: query }
            url = await axios.post(`${ECUADOR}/getProductos`, value, { headers: headers })
        }
        return url.data
    };

    savePedido = async (encabezado, detalle) => {
        var country = await AsyncStorage.getItem('country')
        const data = { encabezado, detalle }
        let res
        if (country == 1) {
            res = await axios.post(`${localPeru}/reports`, data, { headers: headers });
        }
        if (country == 2) {
            res = await axios.post(`${ECUADOR}/saveOrder`, data, { headers: headers });
        }
        return res.data
    }

    getStatusClients = async () => {
        var country = await AsyncStorage.getItem('country')
        var CVENDE = await AsyncStorage.getItem('vendedor')
        const value = {
            CVENDE
        }
        let res
        if (country == 1) {
            res = await axios.post(`${localPeru}/clients/statusClients`, value, { headers: headers });
        }
        return res.data
    }

    getStatuReport = async () => {
        var country = await AsyncStorage.getItem('country')
        var CVENDE = await AsyncStorage.getItem('vendedor')
        var CDOCODCLI = await AsyncStorage.getItem('CDOCODCLI')
        const value = {
            CDOCODCLI,
            CVENDE
        }
        let res;
        if (country == 1) {
            res = await axios.post(`${localPeru}/reports/StatusAccount`, value, { headers: headers });
        }
        return res.data

    }

    getClients = async (query) => {
        const value = { query }
        let res = await axios.post("http://190.248.67.202:1926/CUSTOMER/GetLisTByName", value, { headers: headers });
        return res.data;
    }

    SaveDailyManagement = async (values) => {
        let res = await axios.post("http://190.248.67.202:1926/DAILYJOB/GetDailyJob", values, { headers: headers });
        return res.data;
    }

    SaveClient = async (values) => {
        let res = await axios.post("http://190.248.67.202:1926/CUSTOMER/GetCustNew", values, { headers: headers });
        return res.status;
    }

    getProductsDailyManagement = async (query) => {
        const Token = await AsyncStorage.getItem('TOKEN')
        const authToken = await AsyncStorage.getItem('AUTHTOKEN')
        const values = { PCustNum: 10, query, Token, authToken }
        try {
            let res = await axios.post("http://so.abracol.co:8050/WSOrderSales.asmx/GetListPartCountries", values, { headers: headers });
            const { d } = res.data
            return d;
        } catch (error) {
            console.log(error);
        }
    }

    saveDailyManagement = async (values) => {
        try {
            let res = await axios.post("http://190.248.67.202:1926/DAILYJOB/GetDailyJob2", values, { headers: headers });
            return res.status;
        } catch (error) {
            console.log(error);
        }
    }

    DailySummary = async () => {
        let country = await AsyncStorage.getItem('country');
        let savedBy = await AsyncStorage.getItem('usuario');
        let jsonSaved = JSON.parse(savedBy)
        let userEcuador = jsonSaved[0].ID3;
        let saved = country == 1 ? savedBy : userEcuador;
        let fechaInicial = moment().format("YYYY/MM/DD") + ' 00:00:00';
        let fechaFinal = moment().format("YYYY/MM/DD") + ' 23:59:59';
        let values = {
            guardadoPor: saved,
            fechaInicial,
            fechaFinal
        }
        try {
            let res = await axios.post("http://190.248.67.202:1926/DAILYJOB/ejecucion", values, { headers: headers });
            return res.data
        } catch (error) {
            console.log(error);
        }
    }

    WeekSummary = async () => {
        let country = await AsyncStorage.getItem('country');
        let savedBy = await AsyncStorage.getItem('usuario')
        let jsonSaved = JSON.parse(savedBy)
        let userEcuador = jsonSaved[0].ID3;
        let saved = country == 1 ? savedBy : userEcuador;
        let currentDate = moment();
        let weekStart = currentDate.clone().startOf('isoWeek');
        let monday = moment(weekStart).add(0, 'days').format("YYYY-MM-DD");
        let friday = moment(weekStart).add(4, 'days').format("YYYY-MM-DD");
        let fechaInicial = monday + ' 00:00:00';
        let fechaFinal = friday + ' 23:59:59';
        let values = {
            guardadoPor: saved,
            fechaInicial,
            fechaFinal
        }
        try {
            let res = await axios.post("http://190.248.67.202:1926/DAILYJOB/ejecucion", values, { headers: headers });
            return res.data
        } catch (error) {
            console.log(error);
        }
    }

    UpdateClient = async (values) => {
        try {
            let res = await axios.post("http://190.248.67.202:1926/CUSTOMER/UpdateByID", values, { headers: headers });
            return res.status;
        } catch (error) {
            console.log(error);
        }
    }
}
