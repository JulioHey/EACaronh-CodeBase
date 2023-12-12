import {Text, View} from "react-native";
import {AppContext} from "../../store/context/app";
import {useContext, useEffect, useState} from "react";
import {BaseButton} from "react-native-gesture-handler";
import {ThemeContext} from "../../store/context/theme";
import RideList from "../../components/organism/rideList";
import {AuthContext} from "../../store/context/auth";
import {AuthService} from "../../store/services/auth";
import {RideService} from "../../store/services/ride";

const CarHome = () => {
    const {token} = useContext(AuthContext);
    const {cars, navigation} = useContext(AppContext);
    const {appTheme} = useContext(ThemeContext);

    const [rides, setRides] = useState([]);

    useEffect(() => {
        RideService.GetRidesFromUser(token).then(res => {
            console.log(res.data)
            setRides(res.data.rides)
        })
    }, [])

    return (
        <View
            style={{
                paddingHorizontal: 20,
            }}
        >
            {cars.length == 0 ?
                <View
                    style={{
                        paddingTop: 100,
                        gap: 20,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            textAlign: "center",
                        }}
                    >
                        Parece que você não tem nenhum carro registrado ainda gostaria de registrar?
                    </Text>
                    <BaseButton
                        onPress={() => navigation.navigate("registerCar")}
                        style={{
                            width: "100%",
                            padding: 12,
                            borderRadius: 100,
                            backgroundColor: appTheme.color.darkBackground
                        }}
                    >
                        <Text
                            style={{
                                color: "white",
                                fontSize: 20,
                                textAlign: "center",
                            }}
                        >
                            Registrar novo Carro
                        </Text>
                    </BaseButton>
                </View> :
                <View>
                        <RideList rides={rides} />
                    <BaseButton
                        onPress={() => navigation.navigate("registerRide")}
                        style={{
                            width: "100%",
                            padding: 12,
                            borderRadius: 100,
                            backgroundColor: appTheme.color.darkBackground
                        }}
                    >
                        <Text
                            style={{
                                color: "white",
                                fontSize: 20,
                                textAlign: "center",
                            }}
                        >
                            Criar uma nova carona
                        </Text>
                    </BaseButton>
                </View>
            }
        </View>
    )
}

export default CarHome;