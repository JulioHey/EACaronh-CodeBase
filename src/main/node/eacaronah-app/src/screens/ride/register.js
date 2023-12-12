import Header from "../../components/molecules/header";
import IconButtonFlat from "../../components/atoms/iconButtonFlat";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Dropdown } from 'react-native-element-dropdown';
import { Text, View} from "react-native";
import Forms from "../../components/organism/forms";
import IconButton from "../../components/atoms/iconButton";
import AntDesign from "react-native-vector-icons/AntDesign";
import PageContainer from "../../containers/pageContainer";
import {ThemeContext} from "../../store/context/theme";
import {useContext, useState} from "react";
import {AppContext} from "../../store/context/app";
import {RideService} from "../../store/services/ride";
import {AuthContext} from "../../store/context/auth";

const RegisterRideScreen = () => {
    const {token} = useContext(AuthContext);
    const {appTheme} = useContext(ThemeContext);
    const {cars, navigation} = useContext(AppContext)

    const [toDistrict, setToDistrict] = useState("");
    const [fromDistrict, setFromDistrict] = useState("");
    const [seats, setSeats] = useState("");
    const [price, setPrice] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [car, setCar] = useState(cars[0]);

    const registerRide = () => {
        const res = RideService.CreateRide({
            car_id: car.id,
            to_address: toDistrict,
            from_address: fromDistrict,
            seats,
            time,
            date,
            price,
        }, token)

        console.log(res.data)
    }


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
            pageTitle="Registro de Carona"
        />
        <View
            style={{
                paddingVertical: 20,
                paddingHorizontal: 20,
                justifyContent: "space-between",
                gap: 20,
            }}
        >
            <Text
                style={{
                    fontSize: 20,
                }}
            >
                Informações sobre a carona
            </Text>
            <Forms
                formsOptions={[
                    {
                        type: "input",
                        title: "Data",
                        value: date,
                        onChange: (e) => setDate(e.target.value)
                    },
                    {
                        type: "input",
                        title: "Horário de Saída",
                        value: time,
                        onChange: (e) => setTime(e.target.value)
                    },
                    {
                        type: "input",
                        title: "Preço",
                        value: price,
                        onChange: (e) => setPrice(e.target.value)
                    },
                    {
                        type: "input",
                        title: "Assentos vazios",
                        value: seats,
                        onChange: (e) => setSeats(e.target.value)
                    },
                ]}
            />
            <Text
                style={{
                    fontSize: 20,
                }}
            >
                Selecione seu carro
            </Text>
            <Dropdown
                style={{
                    paddingHorizontal: appTheme.spacing.m,
                    paddingVertical: appTheme.spacing.s,
                    borderRadius: appTheme.borderRadius.s,
                    fontSize: appTheme.font.size.xl,
                    lineHeight: appTheme.font.lineHeight.xl,
                    borderColor: appTheme.color.darkBackground,
                    borderStyle: "solid",
                    borderWidth: 1,
                    width: "100%",
                    paddingLeft: appTheme.spacing.s,
                }}
                selectedTextStyle={{
                    fontSize: 20
                }}
                valueField="value"
                renderItem={(item) => {
                    return (<View
                            style={{
                                paddingVertical: 8,
                                paddingHorizontal: 15
                            }}
                        >
                        <Text
                            style={{
                                fontSize: 20,
                            }}
                        >
                            {item.brand} {item.model}
                        </Text>
                    </View>
                )}}
                labelField="model"
                valueField="brand"
                data={cars}
                value={car}
                onChange={(item) => {
                    setCar(item.value)
                }}
            />
            <Text
                style={{
                    fontSize: 20,
                }}
            >
                Endereço de saída
            </Text>
            <Forms
                formsOptions={[
                    {
                        type: "input",
                        title: "Distrito",
                        placeholder: "Exemplo: Tatuapé ou EACH",
                        value: fromDistrict,
                        onChange: (e) => setFromDistrict(e.target.value)
                    },
                ]}
            />
            <Text
                style={{
                    fontSize: 20,
                }}
            >
                Endereço de chegada
            </Text>
            <Forms
                formsOptions={[
                    {
                        type: "input",
                        title: "Distrito",
                        placeholder: "Exemplo: Tatuapé ou EACH",
                        value: toDistrict,
                        onChange: (e) => setToDistrict(e.target.value)
                    },
                ]}
            />

            <IconButton
                style={{
                    marginTop: 20,
                    width: "100%",
                    gap: 20,
                    flexDirection: "row"
                }}
                onClick={() => registerRide()}
            >
                <Text
                    style={{
                        color: "white",
                        fontSize: 16,
                    }}
                >
                    Registrar carona
                </Text>
                <AntDesign name="checkcircle" size={30} color="white"/>
            </IconButton>
        </View>

    </PageContainer>
}

export default RegisterRideScreen

