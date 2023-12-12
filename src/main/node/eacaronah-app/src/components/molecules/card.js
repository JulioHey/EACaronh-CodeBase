import FontAwesome from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity, View} from "react-native";
import { useContext} from "react";
import {AppContext, RIDE} from "../../store/context/app";
import {ThemeContext} from "../../store/context/theme";
import { ToMapCard} from "../../utils/ride";
import {ToFullDate} from "../../utils/date";
import Paragraph from "../atoms/Paragraph";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Card = ({title, onPress, info, icon}) => {
    const {appTheme} = useContext(ThemeContext)

    return (
        <TouchableOpacity
            onPress={onPress}
        >
            <View
                style={{
                    backgroundColor: appTheme.color.lightBackgroundSecondary,
                    borderRadius: 10,
                    flexDirection: "row",
                    paddingHorizontal: 12,
                    paddingVertical: 12,
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 20,
                    }}
                >
                    {icon}
                    <View
                        style={{
                            flexDirection: "column",
                        }}
                    >
                        <Paragraph type={"h5"}>
                            {title}
                        </Paragraph>
                        {Object.keys(info).map((key) => {
                            return <KeyValue
                                title={key}
                                value={info[key]}
                            />
                        })}
                    </View>

                </View>
                <MaterialIcons
                    name="navigate-next"
                    color={appTheme.color.darkBackground}
                    size={25}
                />
            </View>
        </TouchableOpacity>
    )
}

const KeyValue = ({title, value}) => {
    return <View
        style={{
            display: "block",
        }}
    >
        <Paragraph type={"h5"}>
            {title + ": "}
        </Paragraph>
        <Paragraph type={"p"}>
            {value}
        </Paragraph>
    </View>
}

export default Card;