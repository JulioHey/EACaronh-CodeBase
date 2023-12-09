import {Text, View} from "react-native";
import {AppContext} from "../../store/context/app";
import {useContext, useState} from "react";
import {BaseButton} from "react-native-gesture-handler";
import {ThemeContext} from "../../store/context/theme";

const CarHome = () => {
    const {cars, navigation} = useContext(AppContext);
    const {appTheme} = useContext(ThemeContext);

    const [rides, setRides] = useState([
    ]);

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
                    {rides.length == 0 ?
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
                                Parece que você não tem nenhuma carona registrado ainda gostaria de registrar?
                            </Text>
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
                        </View> : null
                    }
                </View>
            }
        </View>
    )
}

export default CarHome;