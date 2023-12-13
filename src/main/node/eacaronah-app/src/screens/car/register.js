import PageContainer from "../../containers/pageContainer";
import Header from "../../components/molecules/header";
import IconButtonFlat from "../../components/atoms/iconButtonFlat";
import Ionicons from "react-native-vector-icons/Ionicons";
import {ThemeContext} from "../../store/context/theme";
import {useCallback, useContext, useState} from "react";
import {AppContext} from "../../store/context/app";
import Forms from "../../components/organism/forms";
import {Text, View} from "react-native";
import IconButton from "../../components/atoms/iconButton";
import AntDesign from "react-native-vector-icons/AntDesign";
import {AuthContext} from "../../store/context/auth";
import {RideService} from "../../store/services/ride";
import Modal from "../../components/molecules/modal";

const RegisterCarScreen = () => {
    const {appTheme} = useContext(ThemeContext);
    const {user, token} = useContext(AuthContext);
    const {navigation, fetchCars} = useContext(AppContext);

    const [model, setModel] = useState("Uno");
    const [color, setColor] = useState("Vermelho");
    const [plate, setPlate] = useState("FPP-1789");
    const [brand, setBrand] = useState("Fiat");
    const [document, setDocument] = useState("63438532217");
    const [year, setYear] = useState("2000");

    const [showModal, setShowModal] = useState(false);
    const [modal, setModal] = useState({});

    const registerCar = async () => {
        const car = {
            "user_id": user.user_id,
            color,
            brand,
            model,
            year,
            "license_plate": plate,
        }
        try {
            const res = await RideService.RegisterCar({car, token})
            console.log(res)
            if (res.status === 200) {
                setShowModal(true)
                setModal({
                    title: "Sucesso",
                    subtitle: "Carro cadastrado com sucesso!",
                    buttonText: "Fechar",
                    onPress: async () => {
                        await fetchCars();
                        navigation.navigate("home")
                    }
                })
            } else {
                setShowModal(true)
                setModal({
                    title: "Erro",
                    subtitle: "Erro ao cadastrar carro tente novamente!",
                    buttonText: "Fechar",
                    onPress: async () => {
                        setShowModal(false)
                    }
                })
            }

        } catch (err) {
            setShowModal(true)
            setModal({
                title: "Erro",
                subtitle: "Erro ao cadastrar carro tente novamente!",
                buttonText: "Fechar",
                onPress: async () => {
                    setShowModal(false)
                }
            })
        }
    }

    return <PageContainer>
        {showModal && (
            <Modal
                {...modal}
            />
        )}
        <Header
            heading={(
                <IconButtonFlat
                    style={{
                        width: 45,
                        paddingLeft: appTheme.spacing.l,
                    }}
                    icon={<Ionicons
                        name="chevron-back-circle"
                        size={45}
                        color={appTheme.color.darkBackground}
                    />}
                    onClick={() => navigation.navigate("home")}
                />)}
            pageTitle="Registro de carro"
        />
        <View
            style={{
                paddingVertical: 20,
                paddingHorizontal: 20,
                justifyContent: "space-between",
            }}
        >

            <Forms
                formsOptions={[
                    {
                        type: "input",
                        title: "Modelo do Carro",
                        value: model,
                        onChange: (e) => setModel(e.target.value)
                    },
                    {
                        type: "input",
                        title: "Marca do Carro",
                        value: brand,
                        onChange: (e) => setBrand(e.target.value)
                    },
                    {
                        type: "input",
                        title: "Placa do Carro",
                        value: plate,
                        onChange: (e) => setPlate(e.target.value)
                    },
                    {
                        type: "input",
                        title: "Cor do Carro",
                        value: color,
                        onChange: (e) => setColor(e.target.value)
                    },
                    {
                        type: "input",
                        title: "Ano do Carro",
                        value: year,
                        onChange: (e) => setYear(e.target.value)
                    },
                    {
                        type: "input",
                        title: "CNH do Motorista",
                        value: document,
                        onChange: (e) => setDocument(e.target.value)
                    }
                ]}
            />
            <IconButton
                style={{
                    marginTop: 20,
                    width: "100%",
                    gap: 20,
                    flexDirection: "row"
                }}
                onClick={() => registerCar()}
            >
                <Text
                    style={{
                        color: "white",
                        fontSize: 20,
                    }}
                >
                    Registrar carro
                </Text>
                <AntDesign name="checkcircle" size={30} color="white"/>
            </IconButton>
        </View>

    </PageContainer>
}

export default RegisterCarScreen;