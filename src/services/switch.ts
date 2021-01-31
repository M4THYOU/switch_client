export function getState(id: string) {
    const url = 'http://localhost:3000/api/v1/thing/' + id;
    return fetch(url).then(data => {
        return data.json();
    }).catch(e => {
        console.error(e);
    })
}

export function setState(id: string, payload: {}) {
    const url = 'http://localhost:3000/api/v1/thing/' + id;
    return fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(data => {
        return data.json();
    }).catch(e => {
        console.error(e);
    })
}
