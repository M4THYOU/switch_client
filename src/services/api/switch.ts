import {getReq, patchReq} from "./api";
import {API_THING} from "./apiRoutes";

export function getState(id: string) {
    const path = API_THING + id;
    return getReq(path);
}

export function setState(id: string, payload: {}) {
    const path = API_THING + id;
    return patchReq(path, payload);
}
