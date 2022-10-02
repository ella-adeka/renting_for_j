import { useContext  } from "react";
import authContext from "./context/authContext";

const baseURL = "http://127.0.0.1:8000/api/";

const useFetch = () => {
    const { token, setAuth, setToken } = useContext(authContext);

    fetch(baseURL, {
        // fetch('http://127.0.0.1:8000/api/users/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`
            }
        })
        .then(res => res.json())
        .then(res => {
            setAuth(res)
            setToken(res.token)
        });
}

export default useFetch;