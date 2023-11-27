import React, {createContext, useCallback, useState} from "react";

export const AuthContext = createContext({});

export const AuthProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});

    const login = useCallback(() => {
        setIsLoggedIn(true)
    }, [])

    const logout = useCallback(() => {
        setIsLoggedIn(false)
    }, [])

    return (
        <AuthContext.Provider value={{isLoggedIn, user, login, logout}}>
            {props.children}
        </AuthContext.Provider>
    )
}
