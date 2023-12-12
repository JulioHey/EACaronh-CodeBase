import {View} from "react-native";
import {ThemeContext} from "../../store/context/theme";
import {useContext} from "react";

const DetailCard = ({heading, title, trailling, control,borderTop = true, borderBottom = true}) => {
    const {appTheme} = useContext(ThemeContext)

    return (
        <View
            style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: appTheme.color.lightBackground,
                shadowOffset: {
                    width: 4,
                    height: 4,
                },
                shadowColor: "black",
                shadowOpacity: 0.25,
                shadowRadius: 4,
                paddingHorizontal: 20,
                paddingVertical: 15,
                borderBottomRightRadius: borderBottom && control ? 0 : 10,
                borderTopRightRadius: borderTop && control ? 0 : 10,
                borderBottomLeftRadius: borderBottom && control ? 0 : 10,
                borderTopLeftRadius: borderTop && control ? 0 : 10,
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    gap: 14,
                    alignItems: "center"
                }}
            >
                {heading}
                {title}
            </View>
            {trailling}
        </View>
    )
}

export default DetailCard