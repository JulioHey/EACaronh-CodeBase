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
} from "../../store/context/register";
import {isValidEmail, isEmpty} from "../../utils/validation";
import {ThemeContext} from "../../store/context/theme";
import {AuthService} from "../../store/services/auth";

const UserRegister = ({navigation}) => {
    const {appTheme} = useContext(ThemeContext);
    const {setUserInfo} = useContext(RegisterContext);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [documentNumber, setDocumentNumber] = useState("");
    const [phone, setPhone] = useState("");
    const [invalid, setInvalid] = useState({
        name: false,
        email: false,
        birthDate: false,
        documentNumber: false,
        phone: false,
    });

    const validateAndProceed = () => {
        const newInvalid = {...invalid};
        let proceed = true;

        if (isEmpty(name)) {
            console.log("Nome")
            newInvalid.name = true;
            setInvalid(newInvalid);
            proceed = false;
        } else {
            newInvalid.name = false;
            setInvalid(newInvalid);
        }

        if (!isValidEmail(email)) {
            console.log("Email")
            newInvalid.email = true;
            setInvalid(newInvalid);
            proceed = false;
        } else {
            newInvalid.email = false;
            setInvalid(newInvalid);
        }

        if (isEmpty(birthDate)) {
            newInvalid.birthDate = true;
            setInvalid(newInvalid);
            proceed = false;
        } else {
            newInvalid.birthDate = false;
            setInvalid(newInvalid);
        }

        if (isEmpty(documentNumber)) {
            console.log("Documento")
            newInvalid.documentNumber = true;
            setInvalid(newInvalid);
            proceed = false;
        } else {
            newInvalid.documentNumber = false;
            setInvalid(newInvalid);
        }

        if (isEmpty(phone)) {
           console.log("Telefone")
            newInvalid.phone = true;
            setInvalid(newInvalid);
            proceed = false;
        } else {
            newInvalid.phone = false;
            setInvalid(newInvalid);
        }
        if (proceed) {
            setUserInfo({
                name,
                email,
                phone,
                documentNumber,
                birthDate
            });
            AuthService.sendOTP({email}).then((res) => {
                navigation.navigate("otp");
            }).catch(() => {
                navigation.navigate("otp");
            });
        }
    }

    return (
        <PageContainer
            hasFooter={false}
        >
            <View
                style={{
                    paddingHorizontal: 20,
                }}
            >
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
                    pageTitle={"Cadastro"}
                />
                <Forms
                    formsOptions={[
                        {
                            type: "input",
                            title: "Nome completo",
                            value: name,
                            onChange: (e) => setName(e.target.value),
                            invalid: invalid.name
                        },
                        {
                            type: "input",
                            title: "Email",
                            value: email,
                            onChange: (e) => setEmail(e.target.value),
                            invalid: invalid.email
                        },
                        {
                            type: "input",
                            title: "Data de nascimento",
                            value: birthDate,
                            onChange: (e) => setBirthDate(e.target.value),
                            invalid: invalid.birthDate,
                            mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
                        },
                        {
                            type: "input",
                            title: "CPF",
                            value: documentNumber,
                            onChange: (e) => setDocumentNumber(e.target.value),
                            invalid: invalid.documentNumber,
                            mask: [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]
                        },
                        {
                            type: "input",
                            title: "Telefone",
                            value: phone,
                            onChange: (e) => setPhone(e.target.value),
                            invalid: invalid.phone,
                            mask: ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
                        }
                    ]}
                />
                <IconButton style={{
                    marginLeft: "auto",
                    marginTop: appTheme.spacing.xl,
                }} onClick={() => {
                    validateAndProceed();
                }}>
                    <MaterialIcons name="navigate-next" size={30} color="white"/>
                </IconButton>
            </View>

        </PageContainer>
    )
}

export default UserRegister;
