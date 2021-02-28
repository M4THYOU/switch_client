import {API_FAMILY, API_FAMILY_CLUSTERS, API_FAMILY_PRIMARY} from "./apiRoutes";
import {getReq, postReq} from "./api";

export function createFamily() {
    return postReq(API_FAMILY, {}, true);
}

export function getFamilies() {
    return getReq(API_FAMILY, true);
}

export function getFamilyClusters(family_group_id: number) {
    const url = API_FAMILY_CLUSTERS + family_group_id;
    return getReq(url, true);
}

export function getPrimaryFamily() {
    return getReq(API_FAMILY_PRIMARY, true);
}
