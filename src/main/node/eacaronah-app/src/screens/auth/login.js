import {useContext, useState} from "react";
import {Image, View} from "react-native";

import {AuthContext} from "../../store/context/auth";

import logo from "../../assets/images/logo.png";
import Forms from "../../components/organism/forms";
import theme from "../../theme/theme";
import PageContainer from "../../containers/pageContainer";

const LoginScreen = ({navigation}) => {
    const {login} = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
                        onChange: (e) => setEmail(e.target.value)
                    },
                    {
                        type: "input",
                        title: "Password",
                        value: password,
                        onChange: (e) => setPassword(e.target.value)
                    },
                    {
                        type: "elevetedButton",
                        title: "Entrar",
                        onClick: () => login()
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
