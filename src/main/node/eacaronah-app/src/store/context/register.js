import {createContext, useCallback, useState} from "react";
import {AuthService} from "../services/auth";

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

  const checkOTPCode = useCallback(async (code, email) => {
    const res = await AuthService.checkOTP({code, email});
    if (res.status === 200) {
        return true
    } else {
        return false
    }
  });

    return (<RegisterContext.Provider value={{setUserInfo, registerForm, setInstitutionInfo, checkOTPCode}}>
        {children}
    </RegisterContext.Provider>)
}

