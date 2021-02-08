import {useEffect} from "react";
import {useHistory} from "react-router";
import {PATH_LOGIN} from "../services/routePaths";

export function useProvideAuth() {
    let history = useHistory();
    useEffect(() => {
        const AUTH_URL = process.env.REACT_APP_AUTH_URL || '';
        const url = AUTH_URL + 'ping-auth';
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
