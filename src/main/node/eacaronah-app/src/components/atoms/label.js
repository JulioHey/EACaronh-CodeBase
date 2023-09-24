import {Text} from "react-native";
import theme from "../../theme/theme";

const Label = ({text, style}) => {
    return (
        <Text style={
            style ?? {
                fontSize: theme.font.size.m,
                fontWeight: "600",
            }
        }>{text}</Text>
    )
}

export default Label;