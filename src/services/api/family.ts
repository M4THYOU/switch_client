import {API_FAMILY} from "./apiRoutes";
import {getReq, postReq} from "./api";

export function createFamily() {
    return postReq(API_FAMILY, {}, true);
}

export function getFamilies() {
    return getReq(API_FAMILY, true);
}
