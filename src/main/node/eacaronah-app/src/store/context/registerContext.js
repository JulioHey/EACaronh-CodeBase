import {createContext, useCallback, useState} from "react";

export const RegisterContext = createContext({});

export const RegisterProvider = ({children}) => {
    const [registerForm, setRegisterForm] = useState({
        name: "",
        email: "",
        birthDate: "",
        documentNumber: "",
        phone: "",
        institution: {},
    })

    const setUserInfo = useCallback((userData) => {
        setRegisterForm({
            ...registerForm,
            ...userData,
        });
    }, [registerForm]);

    return (<RegisterContext.Provider value={{setUserInfo, registerForm}}>
        {children}
    </RegisterContext.Provider>)
}

