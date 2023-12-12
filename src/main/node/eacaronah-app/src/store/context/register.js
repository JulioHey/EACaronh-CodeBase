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

    const setInstitutionInfo = useCallback((institutionData) => {
        setRegisterForm({
            ...registerForm,
            institution: {...institutionData}
        });
    }, [registerForm]);

  const checkOTPCode = useCallback((code) => {
    // Vai mandar solicitacao para o Auth Service
  });

    return (<RegisterContext.Provider value={{setUserInfo, registerForm, setInstitutionInfo, checkOTPCode}}>
        {children}
    </RegisterContext.Provider>)
}

