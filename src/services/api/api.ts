const API_URL = process.env.REACT_APP_API_URL || '';
const API_VERSION = process.env.REACT_APP_API_VERSION || '';
const BASE_HEADERS = {
    'Content-Type': 'application/json'
};

function buildUrl(path: string): string {
    while(path.charAt(0) === '/') {
        path = path.substring(1);
    }
    return API_URL + API_VERSION + '/' + path;
}

export function getReq(path: string, isAuth = false) {
    const url = buildUrl(path);
    let headers: any = {...BASE_HEADERS};
    if (isAuth) {
        const token = localStorage.getItem('jwt') || 'Bearer';
        headers = {...BASE_HEADERS, 'Authorization': token};
    }
    return fetch(url, {
        headers,
    }).then(data => {
        if (data.status === 200) {
            return data.json();
        } else {
            throw new Error(data.status.toString(10));
        }
    });
}

export function postReq(path: string, payload: {}, isAuth = false) {
    const url = buildUrl(path);
    let headers: any = {...BASE_HEADERS};
    if (isAuth) {
        const token = localStorage.getItem('jwt') || 'Bearer';
        headers = {...BASE_HEADERS, 'Authorization': token};
    }
    return fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
    }).then(data => {
        if (data.status === 200) {
            return data.json();
        } else {
            throw new Error(data.status.toString(10));
        }
    });
}

export function patchReq(path: string, payload: {}, isAuth = false) {
    const url = buildUrl(path);
    let headers: any = {...BASE_HEADERS};
    if (isAuth) {
        const token = localStorage.getItem('jwt') || 'Bearer';
        headers = {...BASE_HEADERS, 'Authorization': token};
    }
    return fetch(url, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(payload)
    }).then(data => {
        if (data.status === 200) {
            return data.json();
        } else {
            throw new Error(data.status.toString(10));
        }
    });
}
