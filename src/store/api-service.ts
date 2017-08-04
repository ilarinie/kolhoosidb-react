import { KolhoosiError } from './error';

const API_URL = 'https://kolhoosidb-api.herokuapp.com/';

const getHeaders = (): Headers => {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    headers.append('Accept', 'application/json');
    headers.append('Content-type', 'application/json');
    return headers;
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
    return fetch(API_URL + path, getInit)
            .then(readResponseJSON)
            .then(validateResponse);        
};

const fetchPost = (path: string, method: string, data: any) => {
    let postInit = init;
    postInit.method = method;
    postInit.headers = getHeaders();
    postInit.data = JSON.stringify(data);
    return fetch(API_URL + path, postInit)
           .then(readResponseJSON)
           .then(validateResponse);
};
const validateResponse = (response) => {
    if (response.errors) {
        throw new KolhoosiError('Backend reported errors.', response.errors);
    }
    return response;
};

const readResponseJSON = (response) => {
    if (response.status !== 401) {
        return response.json();
    } else {
        throw Error('Unauthorized, you must log in first');
    }
    
};

export const get = (path: string): Promise<any> => {
    let getInit = init;
    getInit.method = 'GET';
    getInit.headers = getHeaders();
    return runFetch(new Request(API_URL + path, getInit));
};

export const post = (path: string, data: any): Promise<any> => {
    let postInit: any = init;
    postInit.method = 'POST';
    postInit.body = data;
    postInit.headers = getHeaders();
    return fetchPost(path, 'POST', data);
};

export const put = (path: string, data: any): Promise<any> => {
    let putInit: any = init;
    putInit.method = 'PUT';
    putInit.body = data;
    putInit.headers = getHeaders();
    return runFetch(new Request(API_URL + path, putInit));
};

export const destroy = (path: string): Promise<any> => {
    let deleteInit = init;
    deleteInit.method = 'DELETE';
    deleteInit.headers = getHeaders();
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
    })
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