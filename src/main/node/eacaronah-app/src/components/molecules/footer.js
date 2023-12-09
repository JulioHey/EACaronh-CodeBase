import {Dimensions, Text, View} from "react-native";
import MaterialIcons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import theme from "../../theme/theme";
import IconButtonFlat from "../atoms/iconButtonFlat";
import {useContext} from "react";
import {AppContext} from "../../store/context/app";
import {ThemeContext} from "../../store/context/theme";

const Footer = () => {
    const {navigation} = useContext(AppContext)
    const {appTheme} = useContext(ThemeContext)

    return (
        <View
            style={{
                display: "flex",
                position: "absolute",
                bottom: 0,
                width: Dimensions.get('window').width,
                backgroundColor: appTheme.color.darkBackground,
                height: 60,
                justifyContent: "center",
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                }}
            >
                <IconButtonFlat
                    icon={<MaterialIcons
                        name="home"
                        color="white"
                        size={25}
                    />}
                    name={"Pagina Inicial"}
                    onClick={() => navigation.navigate("home")}
                />
                <IconButtonFlat
                    icon={<MaterialIcons
                        name="keypad"
                        color="white"
                        size={25}
                    />}
                    name={"Serviços"}
                />
                <IconButtonFlat
                    style={{
                    }}
                    icon={<FontAwesome
                        name="user"
                        color="white"
                        size={25}
                    />}
                    name={"Conta"}
                />
            </View>

        </View>
    )
}

export default Footer;