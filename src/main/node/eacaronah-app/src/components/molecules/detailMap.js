import {useContext} from "react";
import {ThemeContext} from "../../store/context/theme";
import {Text, View} from "react-native";

const DetailMap = ({
                       title, ride
                   }) => {
    const {appTheme} = useContext(ThemeContext);

    return (
        <View
            style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                backgroundColor: "white",
                borderRadius: 8,
                borderWidth: 1,
                borderColor: appTheme.color.darkBackground,
                padding: appTheme.spacing.m,
            }}
        >
            <Text
                style={{
                    fontSize: 24,
                }}
            >
                {title}
            </Text>
            {Object.keys(ride).map((key, index) => {
                return (
                    <View key={index}
                          style={{
                              display: "block",
                          }}
                    >
                        <Text
                            style={{
                                fontWeight: "bold",
                            }}
                        >
                            {key}:
                        </Text>
                        <Text key={index}>
                            {" " + ride[key]}
                        </Text>
                    </View>
                )
            })}
        </View>
    )
}

export default DetailMap;