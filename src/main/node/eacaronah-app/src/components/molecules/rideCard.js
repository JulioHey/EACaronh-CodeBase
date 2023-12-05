import MaterialIcons from "react-native-vector-icons/FontAwesome5";
import {Text, View} from "react-native";
import theme from "../../theme/theme";
import {useCallback} from "react";

const RideCard = ({ride}) => {
    const rideSubtitle = useCallback((key, value) => {
        return (<Text
            style={{
                fontSize: theme.font.size.s,
            }}
        >
            {key}: {value}
        </Text>);
    }, [])
    return (
        <View
            style={{
                flexDirection: "row",
                gap: 10,
                backgroundColor: theme.color.lightBackground,
                borderRadius: theme.borderRadius.s,
                alignItems: "center",
                paddingVertical: theme.spacing.s,
                paddingHorizontal: theme.spacing.m,
                borderStyle: "solid",
                borderColor: theme.color.darkBackground,
                borderWidth: 1,
                shadowColor: "#000",
                shadowOffset: {

                }
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
    )
}

export default RideCard;