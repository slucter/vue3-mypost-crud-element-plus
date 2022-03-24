import axios from 'axios';
import Interceptor from './intercept'

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com"
})


export const http = Interceptor(instance)

