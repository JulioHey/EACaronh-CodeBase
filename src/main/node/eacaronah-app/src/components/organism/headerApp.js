import theme from "../../theme/theme";
import {View} from "react-native";
import IconButtonFlat from "../atoms/iconButtonFlat";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Separator from "../atoms/separator";
import MaterialCommunityIcons
    from "react-native-vector-icons/MaterialCommunityIcons";
import {AppContext, CAR, RIDE} from "../../store/context/app";
import {useContext} from "react";
import {ThemeContext} from "../../store/context/theme";

const HeaderApp = () => {
    const {ride, setRide} = useContext(AppContext);
    const {appTheme} = useContext(ThemeContext)

    return (
        <View
            style={{
                marginBottom: appTheme.spacing.l,
            }}
        >
            <View
                style={{
                    width: "100%",
                    justifyContent: "space-around",
                    paddingHorizontal: appTheme.spacing.xl,
                    paddingVertical: appTheme.spacing.m,
                    flexDirection: "row",
                }}
            >

                <IconButtonFlat
                    onClick={() => {
                        setRide(RIDE);
                    }}
                    style={{
                        flexDirection: "row",
                        gap: 10,
                    }}
                    icon={
                        <MaterialCommunityIcons
                            name="human-handsup"
                            size={50}
                            color={appTheme.color.darkBackground}
                        />
                    }
                    color={appTheme.color.darkBackground}
                    name={"Carona"}
                />
                <Separator
                    direction={"horizontal"}
                />
                <IconButtonFlat
                    onClick={() => {
                        setRide(CAR);
                    }}
                    style={{
                        flexDirection: "row",
                        gap: 10,
                    }}
                    icon={
                        <FontAwesome5
                            name="car"
                            size={50}
                            color={appTheme.color.darkBackground}
                        />
                    }
                    color={appTheme.color.darkBackground}
                    name={"Tenho carro"}
                />
            </View>
            <View
                style={{
                    flexDirection: "row",
                }}
            >
                <View
                    style={{
                        width: "50%",
                        height: 2,
                        backgroundColor: ride === RIDE ? appTheme.color.darkBackground : "transparent",
                    }}
                />
                <View
                    style={{
                        height: 2,
                        width: "50%",
                        backgroundColor: ride !== RIDE ? appTheme.color.darkBackground : "transparent",
                    }}
                />
            </View>
        </View>
    )
}

export default HeaderApp;