import { KolhoosiError } from './error';
import axios, { AxiosRequestConfig } from 'axios';
import createBrowserHistory from '../history';
import { mainState } from './state';
import { getEnv } from '../environment';

const API_URL = getEnv().apiUrl;

const config = (): AxiosRequestConfig => {
    return {
        headers: {
            'Authorization': 'Bearer ' + mainState.authState.token,
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
    return axios.put(API_URL + path, data, config()).then((response) => {
        return response.data;
    }).catch(handleAxiosError);
};

const handleAxiosError = (error: any) => {
    console.log('asd');
    if (error.response && error.response.status === 401) {
        console.log('redirecting to login..');
        mainState.authState.token = '';
        createBrowserHistory.push('/login');
        throw new KolhoosiError(error.response.data.message, error.response.data.errors);
    } else if (error.response) {
        throw new KolhoosiError(error.response.data.message, error.response.data.errors);
    } else {
        if (error.errors) {
            throw new KolhoosiError(error.message, error.errors);
        } else {
            throw new KolhoosiError(error.message, []);
        }
    }
};
