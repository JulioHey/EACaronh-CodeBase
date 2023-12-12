import {Text, View} from "react-native";
import Forms from "../../components/organism/forms";
import {useContext, useState} from "react";
import IconButton from "../../components/atoms/iconButton";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import PageContainer from "../../containers/pageContainer";
import Header from "../../components/molecules/header";
import BackgroundText from "../../components/atoms/backgroundText";
import OTPInput from "../../components/molecules/otpInput";
import TextButton from "../../components/atoms/textButton";
import {
    RegisterContext,
    RegisterProvider
} from "../../store/context/register";
import {ThemeContext} from "../../store/context/theme";

const OTPVerification = ({navigation}) => {
    const {registerForm, checkOTPCode} = useContext(RegisterContext);
    const [code, setCode] = useState("");
    const [invalid, setInvalid] = useState(false);
    const {appTheme} = useContext(ThemeContext);

  const validateAndProceed = () => {
    setInvalid(false);
    console.log(registerForm);
    checkOTPCode(code);
    console.log(code);
    navigation.navigate("institutionRegister");
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
              fontSize: appTheme.font.size.l,
              fontWeight: appTheme.font.weight.m,
              textAlign: "center",
              margin: appTheme.spacing.xl
            }}>
              Enviamos um código de verificação temporária para {registerForm.phone}.
              Insira o código para verificar esse número de telefone.
            </Text>

            <OTPInput onChange={setCode} invalid={invalid} title="Código de verificação:"/>
            <View style={{
              marginVertical: appTheme.spacing.xl,
              justifyContent: "space-between"
            }}>
              <TextButton title="Enviar um novo código." />
              <TextButton title="Trocar de telefone." />
            </View>

            <IconButton style={{
                marginLeft: "auto",
                marginTop: appTheme.spacing.xl,
            }} onClick={() => {
              validateAndProceed();
            }}>
                <MaterialIcons name="navigate-next" size={30} color="white"/>
            </IconButton>
        </PageContainer>
    )
}

export default OTPVerification;
