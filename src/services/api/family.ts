import {API_FAMILY} from "./apiRoutes";
import {postReq} from "./api";

export function createFamily() {
    return postReq(API_FAMILY, {});
}
