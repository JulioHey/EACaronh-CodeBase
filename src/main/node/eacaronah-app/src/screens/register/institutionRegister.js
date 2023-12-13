import React, {useContext, useState} from "react";
import PageContainer from "../../containers/pageContainer";
import Header from "../../components/molecules/header";
import IconButton from "../../components/atoms/iconButton";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {View} from "react-native";
import Forms from "../../components/organism/forms";
import {RegisterContext} from "../../store/context/register";
import theme from "../../theme/theme";
import {isEmpty} from "../../utils/validation";
import {ThemeContext} from "../../store/context/theme";
import {AuthService} from "../../store/services/auth";
import {AuthContext} from "../../store/context/auth";

const InstitutionRegister = ({navigation}) => {
    const {appTheme} = useContext(ThemeContext);
    const {setInstitutionInfo, registerForm} = useContext(RegisterContext);
    const {register} = useContext(AuthContext);

    const [institutionName, setInstitutionName] = useState("");
    const [institutionNumber, setInstitutionNumber] = useState("");
    const [position, setPosition] = useState("");

    const [curso, setCurso] = useState("");
    const [anoDeIngresso, setAnoDeIngresso] = useState("");
    const [periodo, setPeriodo] = useState("");

    const [departamento, setDepartamento] = useState("");

    const [invalid, setInvalid] = useState({
        institutionName: false,
        institutionNumber: false
    })

    const validateAndProceed = async () => {
        const newInvalid = {...invalid};
        let proceed = true;

        if (isEmpty(institutionName)) {
            newInvalid.institutionName = true;
            setInvalid(newInvalid);
            proceed = false;
        } else {
            newInvalid.institutionName = false;
            setInvalid(newInvalid);
        }

        if (isEmpty(institutionNumber)) {
            newInvalid.institutionNumber = true;
            setInvalid(newInvalid);
            proceed = false;
        } else {
            newInvalid.institutionNumber = false;
            setInvalid(newInvalid);
        }

        if (proceed) {
            setInstitutionInfo(navigation, {
                name: institutionName,
                number: institutionNumber,
                position: position,
                curso,
                anoDeIngresso,
                periodo,
                departamento
            });
            const res = await register({
                ...registerForm,
                institution: {
                    name: institutionName,
                    registration_number: institutionNumber,
                    period: periodo,
                    ingress_year: anoDeIngresso
                }
            })

            if (res != "Error") {
                navigation.navigate("success")
            }
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
                            options: ["Aluno", "Funcionário"]
                        },
                    ]}
                />

                {position === "Aluno" &&
                    <Forms
                        formsOptions={[
                            {
                                type: "input",
                                title: "Curso",
                                value: curso,
                                onChange: (e) => setCurso(e.target.value),
                            },
                            {
                                type: "input",
                                title: "Ano de Ingresso",
                                value: anoDeIngresso,
                                onChange: (e) => setAnoDeIngresso(e.target.value),
                            },
                            {
                                type: "input",
                                title: "Período",
                                value: periodo,
                                onChange: (e) => setPeriodo(e.target.value),
                            },
                        ]}
                    />
                }
                {position === "Funcionário" &&
                    <Forms
                        formsOptions={[
                            {
                                type: "input",
                                title: "Departamento",
                                value: departamento,
                                onChange: (e) => setDepartamento(e.target.value),
                            },
                        ]}
                    />
                }

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

export default InstitutionRegister;
