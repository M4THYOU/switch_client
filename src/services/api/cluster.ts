import {getReq} from "./api";
import {API_CLUSTER} from "./apiRoutes";

export function getClusters() {
    return getReq(API_CLUSTER, true);
}
