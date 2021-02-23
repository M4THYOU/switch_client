import {getReq, patchReq, postReq} from "./api";
import {API_THING, API_THING_ACTIVATE} from "./apiRoutes";

export function getState(id: string) {
    const path = API_THING + id;
    return getReq(path, true);
}

export function setState(id: string, payload: {}) {
    const path = API_THING + id;
    return patchReq(path, payload, true);
}

export function getThings() {
    return getReq(API_THING, true);
}

export function activateThing(payload: {}) {
    return postReq(API_THING_ACTIVATE, payload, true);
}
