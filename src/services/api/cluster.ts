import {getReq} from "./api";
import {API_CLUSTER, API_CLUSTER_THINGS} from "./apiRoutes";

export function getClusters() {
    return getReq(API_CLUSTER, true);
}

export function getClusterThings(cluster_group_id: number) {
    const url = API_CLUSTER_THINGS + cluster_group_id;
    return getReq(url, true);
}
