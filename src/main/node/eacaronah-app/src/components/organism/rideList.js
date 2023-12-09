import {Text, View} from "react-native";
import RideCard from "../molecules/rideCard";
import SizedBox from "../atoms/sizedBox";
import theme from "../../theme/theme";
import MaterialIcons from "react-native-vector-icons/FontAwesome5";
import {useContext, useState} from "react";
import {AppContext} from "../../store/context/app";
import {ThemeContext} from "../../store/context/theme";

const RideList = () => {
    const [rides, setRides] = useState([
        {
            "title": "Carona",
            "local": "São Paulo",
            "time": "12:00",
            "date": "12/12/2022"
        }
    ]);
    const {appTheme} = useContext(ThemeContext)

    return (
        <View
            style={{
                paddingVertical: appTheme.spacing.m,
                paddingHorizontal: appTheme.spacing.l,
            }}
        >
            {rides.length == 0 ?
                <>
                    <View
                        style={{
                            flexDirection: "row",
                            gap: 10,
                            alignItems: "center",
                            paddingHorizontal: appTheme.spacing.m,
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: appTheme.color.darkBackground,
                                borderRadius: "50%",
                                padding: appTheme.spacing.s
                            }}
                        >
                            <MaterialIcons
                                name="car"
                                size={50}
                                color="white"
                            />
                        </View>

                        <View>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: "bold",
                                }}
                            >
                                Nenhuma carona encontrada
                            </Text>
                            <Text>
                                Diga-nos para onde você quer ir
                            </Text>
                        </View>
                    </View>
                </>

                :
                <>
                    <Text
                        style={{
                            fontSize: 20,
                        }}
                    >
                        Caronas Encontradas
                    </Text>
                    <SizedBox height={10} />
                    {rides.length == 0 ?
                        "Tem nada aqui :sad" :
                        rides.map((sugestion) => {
                            return <RideCard
                                key={sugestion.title}
                                ride={sugestion}/>
                        })
                    }
                </>
            }
        </View>
    )
}

export default RideList;