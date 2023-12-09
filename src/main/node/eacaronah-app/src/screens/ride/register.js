import Header from "../../components/molecules/header";
import IconButtonFlat from "../../components/atoms/iconButtonFlat";
import Ionicons from "react-native-vector-icons/Ionicons";
import {Text, View} from "react-native";
import Forms from "../../components/organism/forms";
import IconButton from "../../components/atoms/iconButton";
import AntDesign from "react-native-vector-icons/AntDesign";
import PageContainer from "../../containers/pageContainer";
import {ThemeContext} from "../../store/context/theme";
import {useContext, useState} from "react";

const RegisterRideScreen = () => {
    const {appTheme} = useContext(ThemeContext);
    const [toCity, setToCity] = useState("");
    const [toStreet, setToStreet] = useState("");
    const [toNeighborhood, setToNeighborhood] = useState("");
    const [fromCity, setFromCity] = useState("");


    return <PageContainer>
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

export default RegisterRideScreen