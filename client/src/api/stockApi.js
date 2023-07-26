import axios from 'axios';
const BASE_URL = 'http://localhost:5000'

export async function postStocksData(data){
    return axios.post(`${BASE_URL}/api/fetchStockData`, data);
}