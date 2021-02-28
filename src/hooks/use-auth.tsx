import {useEffect} from "react";
import {useHistory} from "react-router";
import {PATH_LOGIN} from "../services/routePaths";
import {API_PING_AUTH} from "../services/api/apiRoutes";

export function useProvideAuth() {
    let history = useHistory();
    useEffect(() => {
        const AUTH_URL = process.env.REACT_APP_AUTH_URL || '';
        const url = AUTH_URL + API_PING_AUTH;
        const token = localStorage.getItem('jwt') || 'Bearer';
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }).then(resp => {
            if (+resp.status !== 200) {
                history.push(PATH_LOGIN)
            }
        }).catch(e => {
            console.error(e);
        });
    }, []);
}
