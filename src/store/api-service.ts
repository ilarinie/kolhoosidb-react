import { KolhoosiError } from './error';
import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';
import createBrowserHistory from '../history';
import { mainState } from './state';

const API_URL = 'https://kolhoosidb-api.herokuapp.com/';

const config = (): AxiosRequestConfig => {
    return {
        headers:  {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        'Accept': 'application/json',
        'Content-type': 'application/json'
    }
} as AxiosRequestConfig;
};

export const get = (path: string): Promise<any> => {
    return axios.get(API_URL + path, config()).then((response) => {
        return response.data;
    }).catch(handleAxiosError);
};

export const post = (path: string, data: object): Promise<any> => {
    console.log(dataConfig(data));
    return axios.post(API_URL + path, data, config()).then((response) => {
        return response.data;
    }).catch(handleAxiosError);
};

export const destroy = (path: string): Promise<any> => {
    return axios.delete(API_URL + path, config()).then((response) => {
        return response.data;
    }).catch(handleAxiosError);
};

export const put = (path: string, data: object) => {
    return axios.put(API_URL + path, dataConfig(data)).then((response) => {
        return response.data;
    }).catch(handleAxiosError);
};

const dataConfig = (data: object): {} => {
    let dataConfiguration: any = config();
    dataConfiguration.body = data;
    return dataConfiguration;
};

const handleAxiosError = (error: any) => {
    if (error.response.status === 401) {
        console.log('redirecting to login..');
        mainState.authState.token = '';
        createBrowserHistory.push('/login');
        throw new KolhoosiError(error.response.data.message, error.response.data.errors);
    } else if (error.response) {
        throw new KolhoosiError(error.response.data.message, error.response.data.errors);
    } else {
        throw new KolhoosiError(error.message, error.errors);
    }
};