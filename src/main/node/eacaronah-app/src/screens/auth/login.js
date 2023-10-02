import {useContext, useState} from "react";
import {Image, View} from "react-native";

import {AuthContext} from "../../store/context/auth";

import logo from "../../assets/images/logo.png";
import Forms from "../../components/organism/forms";
import theme from "../../theme/theme";
import PageContainer from "../../containers/pageContainer";
import { isValidEmail, isEmpty } from "../../utils/validation";

const LoginScreen = ({navigation}) => {
    const {login} = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);


    const validateAndLogin = () => {
      if(!isValidEmail(email))
        setInvalidEmail(true);
      else if(isEmpty(password))
        setInvalidPassword(true);
      else
        login();
    }

    return (
        <PageContainer>
            <Image
                style={{
                        height: 200,
                }}
                source={require("../../assets/images/logo.png")}
            />
            <Forms
                formsOptions={[
                    {
                        type: "input",
                        title: "Email",
                        value: email,
                        onChange: (e) => setEmail(e.target.value),
                        invalid: invalidEmail
                    },
                    {
                        type: "input",
                        title: "Senha",
                        value: password,
                        onChange: (e) => setPassword(e.target.value),
                        invalid: invalidPassword
                    },
                    {
                        type: "elevetedButton",
                        title: "Entrar",
                        onClick: () => validateAndLogin()
                    },
                    {
                        type: "elevetedButton",
                        title: "Esqueci minha senha",
                        onClick: () => console.log("Esqueci minha senha")
                    },
                    {
                        type: "spanTextButton",
                        text: "Não tem uma conta?",
                        callToAction: "Cadastre-se aqui",
                        onClick: () => navigation.navigate("userRegister")
                    },
                ]}
            />
        </PageContainer>

    )
}

export default LoginScreen;
