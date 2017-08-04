
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
    return runFetch(new Request(API_URL + path, postInit));
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
    return runFetch(new Request(API_URL + path, deleteInit));
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
        let json = response.json();
        if (response.status >= 200 && response.status < 300 ) {
            return json;
        } else {
            return Promise.reject('Username or password wrong, try again.');
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