import MaterialIcons from "react-native-vector-icons/FontAwesome5";
import {Text, View} from "react-native";
import theme from "../../theme/theme";
import {useCallback, useContext} from "react";
import {BaseButton} from "react-native-gesture-handler";
import {useNavigation} from "react-router-native";
import {AppContext} from "../../store/context/app";
import {ThemeContext} from "../../store/context/theme";

const RideCard = ({ride}) => {
    const {navigation} = useContext(AppContext)
    const {appTheme} = useContext(ThemeContext)

    const rideSubtitle = useCallback((key, value) => {
        return (<Text
            style={{
                fontSize: appTheme.font.size.s,
            }}
        >
            {key}: {value}
        </Text>);
    }, [])
    return (
        <BaseButton
            onPress={() => navigation.navigate("rideDetail", {
                ride: ride
            })}
        >
            <View
                style={{
                    flexDirection: "row",
                    gap: 10,
                    backgroundColor: appTheme.color.lightBackground,
                    borderRadius: appTheme.borderRadius.s,
                    alignItems: "center",
                    paddingVertical: appTheme.spacing.s,
                    paddingHorizontal: appTheme.spacing.m,
                    borderStyle: "solid",
                    borderColor: appTheme.color.darkBackground,
                    borderWidth: 1,
                    shadowColor: "#000",
                    shadowOffset: {

                    }
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
                            fontSize: 25,
                            fontWeight: "bold",
                        }}
                    >
                        {ride.title}
                    </Text>
                    {rideSubtitle("Local", ride.local)}
                    {rideSubtitle("Horário", ride.time)}
                    {rideSubtitle("Data", ride.date)}
                </View>
            </View>
        </BaseButton>

    )
}

export default RideCard;