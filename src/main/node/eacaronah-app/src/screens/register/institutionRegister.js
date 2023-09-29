import React, {useContext, useState} from "react";
import PageContainer from "../../containers/pageContainer";
import Header from "../../components/molecules/header";
import IconButton from "../../components/atoms/iconButton";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {View} from "react-native";
import Forms from "../../components/organism/forms";
import {RegisterContext} from "../../store/context/register";
import theme from "../../theme/theme";

const InstitutionRegister = ({navigation}) => {
    const {registerForm} = useContext(RegisterContext);
    const [institutionName, setInstitutionName] = useState("");
    const [institutionNumber, setInstitutionNumber] = useState("");
    const [position, setPosition] = useState("");
    const [invalid, setInvalid] = useState({institutionName: false, institutionNumber: false})

    //return (<PageContainer>
        //{registerForm.name}
        //{registerForm.email}
        //{registerForm.phone}
        //{registerForm.birthDate}
        //{registerForm.documentNumber}
    //</PageContainer>);
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
                pageTitle={"Cadastro Institucional"}
            />
            <Forms
                formsOptions={[
                    {
                        type: "input",
                        title: "Nome da instituição",
                        value: institutionName,
                        onChange: (e) => setInstitutionName(e.target.value),
                        invalid: invalid.institutionName
                    },
                    {
                        type: "input",
                        title: "Número USP",
                        value: institutionNumber,
                        onChange: (e) => setInstitutionNumber(e.target.value),
                        invalid: invalid.institutionNumber
                    },
                    {
                        type: "selectDropdown",
                        title: "Posição",
                        value: position,
                        onSelect: (e) => setPosition(e),
                        options: ["Aluno", "Professor", "Funcionário"]
                    },
                ]}
            />
            <IconButton style={{
                marginLeft: "auto",
                marginTop: theme.spacing.xl,
            }} onClick={() => {
                console.log(position);
                //setUserInfo(navigation, {
                    //name,
                    //email,
                    //phone,
                    //documentNumber,
                    //birthDate
                //});
                //validateAndProceed();
                //navigation.navigate("otp");
            }}>
                <MaterialIcons name="navigate-next" size={30} color="white"/>
            </IconButton>
        </PageContainer>
    )
}

export default InstitutionRegister;
