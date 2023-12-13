import {Dimensions, Text, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import IconButtonFlat from "../atoms/iconButtonFlat";
import {useContext} from "react";
import {AppContext} from "../../store/context/app";
import {ThemeContext} from "../../store/context/theme";
import {AuthContext} from "../../store/context/auth";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Footer = () => {
    const {navigation} = useContext(AppContext)
    const {logout} = useContext(AuthContext)
    const {appTheme} = useContext(ThemeContext)

    return (
        <View
            style={{
                display: "flex",
                position: "fixed",
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
                    icon={<Ionicons
                        name="home"
                        color="white"
                        size={25}
                    />}
                    name={"Pagina Inicial"}
                    onClick={() => navigation.navigate("home")}
                />
                <IconButtonFlat
                    icon={<Ionicons
                        name="keypad"
                        color="white"
                        size={25}
                    />}
                    name={"Serviços"}
                />
                <IconButtonFlat
                    onClick={logout}
                    style={{
                    }}
                    icon={<MaterialIcons
                        name="logout"
                        color="white"
                        size={25}
                    />}
                    name={"Sair"}
                />
            </View>

        </View>
    )
}

export default Footer;