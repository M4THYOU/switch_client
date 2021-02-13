// The api library is not used here, auth routes do not follow the api routing/url format.
import {API_AUTH_LOGIN, API_AUTH_SIGNUP} from "./apiRoutes";

const AUTH_URL = process.env.REACT_APP_AUTH_URL || '';

export function validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export function register(first_name: string, last_name: string, email: string, password: string) {
    const payload = {
        'user': {
            first_name,
            last_name,
            email,
            password
        }
    };
    const url = AUTH_URL + API_AUTH_SIGNUP;
    return fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    }).then(data => {
        if (+data.status === 200) {
            return data;
        } else {
            console.error('Something went wrong...');
            return null;
        }
    }).catch(e => {
        console.error(e);
    });
}

export function login(email: string, password: string): Promise<any> {
    const payload = {
        'user': {
            email,
            password
        }
    };
    const url = AUTH_URL + API_AUTH_LOGIN;
    return fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    }).then(response => {
        const token = response.headers.get('Authorization');
        if (!!token) {
            localStorage.setItem('jwt', token);
            console.log(token);
            return response;
        } else {
            console.error('Something went wrong...');
            return null;
        }
    }).catch(e => {
        console.error(e);
    });
}