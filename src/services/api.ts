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

export function getReq(path: string) {
    const url = buildUrl(path)
    return fetch(url, {
        headers: {...BASE_HEADERS}
    }).then(data => {
        return data.json();
    }).catch(e => {
        console.error(e);
    });
}

export function patchReq(path: string, payload: {}) {
    const url = buildUrl(path);
    return fetch(url, {
        method: 'PATCH',
        headers: {...BASE_HEADERS},
        body: JSON.stringify(payload)
    }).then(data => {
        return data.json();
    }).catch(e => {
        console.error(e);
    });
}
