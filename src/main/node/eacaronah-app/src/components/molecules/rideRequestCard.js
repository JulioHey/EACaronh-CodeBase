import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {Text, View} from "react-native";
import {useCallback, useContext} from "react";
import {BaseButton} from "react-native-gesture-handler";
import {AppContext} from "../../store/context/app";
import {ThemeContext} from "../../store/context/theme";

const RideRequestCard = ({rideReq}) => {
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
            onPress={() => navigation.navigate("rideRequestDetail", {
                rideReq: rideReq
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
                    <MaterialCommunityIcons
                        name="human-handsup"
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
                        {rideReq.riderName}
                    </Text>
                    {rideSubtitle("Local", rideReq.local)}
                    {rideSubtitle("Horário", rideReq.time)}
                    {rideSubtitle("Data", rideReq.date)}
                    {rideSubtitle("Status", rideReq.status)}
                </View>
            </View>
        </BaseButton>
    )
}

export default RideRequestCard;