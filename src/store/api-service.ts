import { KolhoosiError } from './error';
import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';

const API_URL = 'https://kolhoosidb-api.herokuapp.com/';

const getHeaders = (): Headers => {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    headers.append('Accept', 'application/json');
    // headers.append('Content-type', 'application/json');
    return headers;
};

const axiosHeaders = () => {
    return {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        'Accept': 'application/json',
        'Content-type': 'application/json'
    };
};

const init: any = {
    method: 'GET',
    headers: getHeaders(),
    mode: 'cors',
    cache: 'default'
};

export const fetchGet = (path: string, method: string) => {
    let getInit = init;
    getInit.method = method;
    getInit.headers = getHeaders();
    getInit.body = undefined;
    return fetch(API_URL + path, getInit)
            .then(readResponseJSON)
            .then(validateResponse);        
};

const axiosGet = (path: string): Promise<any> => {
    let config: AxiosRequestConfig = {};
    config.headers = axiosHeaders();
    return axios.get(API_URL + path, config).then((response) => {
        console.log('GOOD');
        return response.data;
    }).catch((error) => {
        if (error.response) {
            throw new KolhoosiError(error.response.data.message, error.response.data.errors);
        } else {
            throw new KolhoosiError(error.message, error.errors);
        }

    });
};

const fetchPost = (path: string, method: string, data: any) => {
    let postInit = init;
    postInit.method = method;
    postInit.headers = getHeaders();
    postInit.body = JSON.stringify(data);
    postInit.headers.append('Content-Type', 'application/json');
    // postInit.headers.append('Content-type', 'application/json');
    console.log(data);
    console.log(postInit);
    return fetch(API_URL + path, postInit)
           .then(readResponseJSON)
           .then(validateResponse);
};
const validateResponse = (response) => {
    if (response.errors) {
        throw new KolhoosiError(response.message, response.errors);
    }
    return response;
};
const readResponseJSON = (response) => {
    return response.json();    
};
export const get = (path: string): Promise<any> => {
    return axiosGet(path);
};
export const post = (path: string, data: any): Promise<any> => {
    return fetchPost(path, 'POST', data);
};
export const put = (path: string, data: any): Promise<any> => {
    return fetchPost(path, 'PUT', data);
};
export const destroy = (path: string): Promise<any> => {
    return fetchGet(path, 'DELETE');
};

export const login = (username: string, password: string): Promise<any> => {
    let data = JSON.stringify({ auth: { username: username, password: password} });
    const loginheaders = new Headers();
    loginheaders.append('Accept', 'application/json');
    loginheaders.append('Content-Type', 'application/json');
    const anit: any = {
        method: 'POST',
        headers: loginheaders,
        body: data
    };
    return fetch(API_URL + 'usertoken', anit).then((response: any) => {
        if (response.status === 404) {
            throw new KolhoosiError('Wrong username and/or password.', ['You need to log in.']);
        }
        let json = response.json();
        if (response.status >= 200 && response.status < 300 ) {
            return json;
        }
    });
};

const runFetch = (request: Request): Promise<any> => {
    return fetch(request).then((response) => {
        let json = response.json();
        if (response.status >= 200 && response.status < 300) {
            return json;
        } else {
            return json.then(Promise.reject.bind(Promise));
        }
        
    });
};

const handleError = (error: any): Promise<any>  => {
    return Promise.reject(error.message || error);
};