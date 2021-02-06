import {getReq, patchReq} from "./api";

export function getState(id: string) {
    const path = '/thing/' + id;
    return getReq(path);
}

export function setState(id: string, payload: {}) {
    const path = '/thing/' + id;
    return patchReq(path, payload);
}
