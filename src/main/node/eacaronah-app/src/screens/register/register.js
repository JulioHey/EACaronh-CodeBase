import {Text, View} from "react-native";
import Forms from "../../components/organism/forms";
import {useContext, useState} from "react";
import IconButton from "../../components/atoms/iconButton";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import theme from "../../theme/theme";
import PageContainer from "../../containers/pageContainer";
import Header from "../../components/molecules/header";
import {
    RegisterContext,
    RegisterProvider
} from "../../store/context/register";

const UserRegister = ({navigation}) => {
    const {setUserInfo} = useContext(RegisterContext);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [documentNumber, setDocumentNumber] = useState("");
    const [phone, setPhone] = useState("");

    return (
        <PageContainer>
            <Header
                heading={(
                    <IconButton
                        onClick={() => navigation.navigate("login")}
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
                pageTitle={<Text>Cadastro</Text>}
            />
            <Forms
                formsOptions={[
                    {
                        type: "input",
                        title: "Nome completo",
                        value: name,
                        onChange: (e) => setName(e.target.value)
                    },
                    {
                        type: "input",
                        title: "Email",
                        value: email,
                        onChange: (e) => setEmail(e.target.value)
                    },
                    {
                        type: "input",
                        title: "Data de nascimento",
                        value: birthDate,
                        onChange: (e) => setBirthDate(e.target.value)
                    },
                    {
                        type: "input",
                        title: "CPF",
                        value: documentNumber,
                        onChange: (e) => setDocumentNumber(e.target.value)
                    },
                    {
                        type: "input",
                        title: "Telefone",
                        value: phone,
                        onChange: (e) => setPhone(e.target.value)
                    }
                ]}
            />
            <IconButton style={{
                marginLeft: "auto",
                marginTop: theme.spacing.xl,
            }} onClick={() => {
                setUserInfo(navigation, {
                    name,
                    email,
                    phone,
                    documentNumber,
                    birthDate
                });
              navigation.navigate("otp");
            }}>
                <MaterialIcons name="navigate-next" size={30} color="white"/>
            </IconButton>
        </PageContainer>
    )
}

export default UserRegister;
