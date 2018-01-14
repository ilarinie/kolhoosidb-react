
const PROD_API_URL = 'https://kolhoosidb-api.ilarinieminen.me/';
const INTEGRATION_API_URL = 'https://i-kolhoosidb-api.ilarinieminen.me/';
const DEVELOPMENT_API_URL = 'http://192.168.0.100:3001/';

export class Env {
    apiUrl: string;
    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }
}

export const getEnv = (): Env => {
    if (process.env.REACT_APP_ENV === 'integration') {
        return getIntegrationEnv();
    }
    if (process.env.NODE_ENV === 'production') {
        return getProductionEnv();
    } else {
        return getDevelopmentEnv();
    }
};

const getProductionEnv = (): Env => {
    return new Env(PROD_API_URL);
};
const getDevelopmentEnv = (): Env => {
    return new Env(DEVELOPMENT_API_URL);
};
const getIntegrationEnv = (): Env => {
    return new Env(INTEGRATION_API_URL);
};