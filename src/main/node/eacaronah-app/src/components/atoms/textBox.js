import {Text, View} from "react-native";
import theme from "../../theme/theme";

const TextBox = ({text, style}) => {
    return (
      <View style={{
        backgroundColor: theme.color.darkBackground,
        padding: theme.spacing.xl,
        width: "50vw",
        height: "50vw",
        borderRadius: theme.borderRadius.s,
        alignItems: "center",
        justifyContent: "center",
      }}>
        <Text style={
            style ?? {
                color: "#FFFFFF",
                fontSize: theme.font.size.m,
                fontWeight: "600",
            }
        }>{text}</Text>
      </View>
    )
}

export default TextBox;
