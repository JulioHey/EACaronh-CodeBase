import {createContext, useCallback, useState} from "react";

import {AuthService} from "../services/auth";
export const RegisterContext = createContext({});

export const RegisterProvider = ({children}) => {
    const [verifiedEmail, setVerifiedEmail] = useState(false);
    const [user, setUser] = useState({
      name: "",
      email: "",
      birthDate: "",
      documentNumber: "",
      phoneNumber: "",
    })
    const [institutionUser, setInstitutionUser] = useState({})

    const setUserInfo = useCallback((userData) => {
      setUser({
        ...userData
      })
    }, [user]);

    const setInstitutionInfo = useCallback((institutionData) => {
      setInstitutionUser({
        ...institutionData
      })
    }, [institutionUser]);

  const setVerifiedEmailToFalse = useCallback(() => {
    setVerifiedEmail(false);
  })

  const sendOTP = useCallback(async () => {
    const res = await AuthService.sendOTP(user.email);
  });

  const checkOTPCode = useCallback(async (code) => {
    const res = await AuthService.checkOTP(user.email, code);
    if (res.status !== 200) {
        return {"error": "Codigo invalido"}
    } else {
      setVerifiedEmail(true);
    }
  });

  const register = useCallback(async () => {
    const res = await AuthService.register({
      user, institutionUser
    })
  });

    return (<RegisterContext.Provider value={{
      user,
      institutionUser,
      setUserInfo,
      setInstitutionInfo,
      checkOTPCode,
      sendOTP,
      setVerifiedEmailToFalse,
      register
      }}>
        {children}
    </RegisterContext.Provider>)
}

