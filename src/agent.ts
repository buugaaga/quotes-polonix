import axios from 'axios'

const POLONIEX_URL = 'https://poloniex.com'

export const fetchTicker = <T>() => axios.get<T>(`${POLONIEX_URL}/public?command=returnTicker`)