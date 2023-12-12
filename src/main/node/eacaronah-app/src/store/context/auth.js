import React, {createContext, useCallback, useState} from "react";
import {AuthService} from "../services/auth";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext({});

export const AuthProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [token, setToken] = useState("");

    const login = useCallback(async ({email, password}) => {
        const res = await AuthService.login({
            email,
            password
        })

        if (res.status !== 200) {
            return {"error": "Usuário ou senha inválidos"}
        } else {
            setIsLoggedIn(true)
            const decoded = jwtDecode(res.data.token);
            setUser(decoded)
            setToken(res.data.token)
        }
    }, [])

    const register = useCallback(async (input) => {
        const res = await AuthService.register(input)
        if (res.status !== 200) {
            return {"error": "Usuário ou senha inválidos"}
        } else {
            setIsLoggedIn(true)
            const decoded = jwtDecode(res.data.token);
            setUser(decoded)
            setToken(res.data.token)
        }
    }, [])

    const logout = useCallback(() => {
        setIsLoggedIn(false)

    }, [])

    return (
        <AuthContext.Provider value={{token, isLoggedIn, user, login, logout, register}}>
            {props.children}
        </AuthContext.Provider>
    )
}
