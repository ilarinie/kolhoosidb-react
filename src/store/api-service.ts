
const API_URL = 'http://kolhoosidb-api.herokuapp.com/';

const headers = new Headers();
headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
headers.append('Accept', 'application/json');
headers.append('Content-type', 'application/json');
const init: any = {
    method: 'GET',
    headers: headers,
    mode: 'cors',
    cache: 'default'
};

export const get = (path: string): Promise<any> => {
    let getInit = init;
    getInit.method = 'GET';
    return runFetch(new Request(API_URL + path, getInit));
};

export const post = (path: string, data: any): Promise<any> => {
    let postInit: any = init;
    postInit.method = 'POST';
    postInit.body = data;
    return runFetch(new Request(API_URL + path, postInit));
};

export const put = (path: string, data: any): Promise<any> => {
    let putInit: any = init;
    putInit.method = 'PUT';
    putInit.body = data;
    return runFetch(new Request(API_URL + path, putInit));
};

export const destroy = (path: string): Promise<any> => {
    let deleteInit = init;
    deleteInit.method = 'DELETE';
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
    return fetch(API_URL + 'user_token', anit).then((response: any) => {
        let json = response.json();
        if (response.status >= 200 && response.status < 300 ) {
            localStorage.setItem('token', response.body.token);
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
            return Promise.reject(json);
        }
        
    }).catch(handleError);
};

const handleError = (error: any): Promise<any>  => {
    return Promise.reject(error.message || error);
};