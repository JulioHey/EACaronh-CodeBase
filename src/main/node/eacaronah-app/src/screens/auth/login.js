import {useContext, useState} from "react";
import {Dimensions, Image, View} from "react-native";

import {AuthContext} from "../../store/context/auth";

import Forms from "../../components/organism/forms";
import PageContainer from "../../containers/pageContainer";
import { isValidEmail, isEmpty } from "../../utils/validation";
import Header from "../../components/molecules/header";

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
        login(email, password);
    }

    return (
        <PageContainer>
            <Header pageTitle="Login" />
            <Image
                style={{
                        height: 150,
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
                        title: "Password",
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
            // <View
            //     style={{
            //         height: Dimensions.get('window').height - 260,
            //         flexDirection: "column",
            //         justifyContent: "space-between",
            //     }}
            // >
            //     <Forms
            //         formsOptions={[
            //             {
            //                 type: "input",
            //                 title: "Email",
            //                 value: email,
            //                 onChange: (e) => setEmail(e.target.value)
            //             },
            //             {
            //                 type: "input",
            //                 title: "Senha",
            //                 value: password,
            //                 onChange: (e) => setPassword(e.target.value)
            //             },
            //         ]}
            //     />
            //     <Forms
            //         formsOptions={[
            //             {
            //                 type: "elevetedButton",
            //                 title: "Entrar",
            //                 onClick: () => login({
            //                     email,
            //                     password
            //                 })
            //             },
            //             {
            //                 type: "elevetedButton",
            //                 title: "Esqueci minha senha",
            //                 onClick: () => console.log("Esqueci minha senha")
            //             },
            //             {
            //                 type: "spanTextButton",
            //                 text: "Não tem uma conta?",
            //                 callToAction: "Cadastre-se aqui",
            //                 onClick: () => navigation.navigate("userRegister")
            //             },
            //         ]}
            //     />
            // </View>
    )
}

export default LoginScreen;
