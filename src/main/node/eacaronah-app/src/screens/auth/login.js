import {useContext, useState} from "react";
import {Dimensions, Image, View} from "react-native";

import {AuthContext} from "../../store/context/auth";

import logo from "../../assets/images/logo.png";
import Forms from "../../components/organism/forms";
import theme from "../../theme/theme";
import PageContainer from "../../containers/pageContainer";
import Header from "../../components/molecules/header";
import SizedBox from "../../components/atoms/sizedBox";

const LoginScreen = ({navigation}) => {
    const {login} = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <PageContainer>
            <Header pageTitle="Login" />
            <Image
                style={{
                        height: 150,
                }}
                source={require("../../assets/images/logo.png")}
            />
            <View
                style={{
                    height: Dimensions.get('window').height - 260,
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
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
                            title: "Senha",
                            value: password,
                            onChange: (e) => setPassword(e.target.value)
                        },
                    ]}
                />
                <Forms
                    formsOptions={[
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
            </View>

        </PageContainer>

    )
}

export default LoginScreen;