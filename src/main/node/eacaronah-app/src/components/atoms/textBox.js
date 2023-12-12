import {useContext} from "react";
import {Text, View} from "react-native";
import theme from "../../theme/theme";
import {ThemeContext} from "../../store/context/theme";

const TextBox = ({text, style}) => {
    const {appTheme} = useContext(ThemeContext);
    return (
      <View style={{
        backgroundColor: appTheme.color.darkBackground,
        padding: appTheme.spacing.xl,
        width: "50vw",
        height: "50vw",
        borderRadius: appTheme.borderRadius.s,
        alignItems: "center",
        justifyContent: "center",
      }}>
        <Text style={
            style ?? {
                color: "#FFFFFF",
                fontSize: appTheme.font.size.m,
                fontWeight: "600",
            }
        }>{text}</Text>
      </View>
    )
}

export default TextBox;
