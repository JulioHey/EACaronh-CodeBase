import {Text, View} from "react-native";
import Forms from "../../components/organism/forms";
import {useContext, useState} from "react";
import IconButton from "../../components/atoms/iconButton";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import theme from "../../theme/theme";
import PageContainer from "../../containers/pageContainer";
import Header from "../../components/molecules/header";
import BackgroundText from "../../components/atoms/backgroundText";
import OTPInput from "../../components/molecules/otpInput";
import TextButton from "../../components/atoms/textButton";
import {
    RegisterContext,
    RegisterProvider
} from "../../store/context/register";

const OTPVerification = ({navigation}) => {
    const {registerForm, setUserInfo} = useContext(RegisterContext);
    const [code, setCode] = useState("");
    const [invalid, setInvalid] = useState(false);

  const validateAndNext = () => {
    //if(code.trim() === "")
  }

    return (
        <PageContainer>
            <Header
                heading={(
                    <IconButton
                        onClick={() => navigation.navigate("userRegister")}
                    >
                        <View style={{
                            position: "absolute",
                            left: "10px"
                        }}>
                            <MaterialIcons name="arrow-back-ios" size={30}
                                           color="white"/>
                        </View>

                    </IconButton>
                )}
                pageTitle={"Cadastro"}
            />

            <BackgroundText value={"Verificar número de telefone"}/>

            <Text style={{
              fontSize: theme.font.size.l,
              fontWeight: theme.font.weight.m,
              textAlign: "center",
              margin: theme.spacing.xl
            }}>
              Enviamos um código de verificação temporária para {registerForm.phone}.
              Insira o código para verificar esse número de telefone.
            </Text>

            <OTPInput onChange={setCode} invalid={invalid} title="Código de verificação:"/>
            <View style={{
              marginVertical: theme.spacing.xl,
              justifyContent: "space-between"
            }}>
              <TextButton title="Enviar um novo código." />
              <TextButton title="Trocar de telefone." />
            </View>

            <IconButton style={{
                marginLeft: "auto",
                marginTop: theme.spacing.xl,
            }} onClick={() => {
                //setUserInfo(navigation, {
                    //name,
                    //email,
                    //phone,
                    //documentNumber,
                    //birthDate
                //})
                console.log(code);
                navigation.navigate("institutionRegister");
            }}>
                <MaterialIcons name="navigate-next" size={30} color="white"/>
            </IconButton>
        </PageContainer>
    )
}

export default OTPVerification;
