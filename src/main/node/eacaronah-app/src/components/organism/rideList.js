import {Text, View} from "react-native";
import RideCard from "../molecules/rideCard";
import SizedBox from "../atoms/sizedBox";
import theme from "../../theme/theme";
import MaterialIcons from "react-native-vector-icons/FontAwesome5";

const RideList = ({rides}) => {
    return (
        <View
            style={{
                paddingVertical: theme.spacing.m,
            }}
        >
            {rides.length == 0 ?
                <>
                    <View
                        style={{
                            flexDirection: "row",
                            gap: 10,
                            alignItems: "center",
                            paddingHorizontal: theme.spacing.m,
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: theme.color.darkBackground,
                                borderRadius: "50%",
                                padding: theme.spacing.s
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
                            fontSize: 25,
                        }}
                    >
                        Caronas Encontradas
                    </Text>
                    <SizedBox height={10} />
                    {rides.length == 0 ?
                        "Tem nada aqui :sad" :
                        rides.map((sugestion) => {
                            return <RideCard ride={sugestion}/>
                        })
                    }
                </>
            }
        </View>
    )
}

export default RideList;