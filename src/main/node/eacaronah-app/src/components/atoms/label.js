import {Text} from "react-native";
import theme from "../../theme/theme";

const Label = ({text, style, invalid}) => {
    return (
        <Text style={
            style ?? {
                fontSize: theme.font.size.m,
                fontWeight: "600",
                color: invalid ? theme.color.invalid : ""
            }
        }>{text}</Text>
    )
}

export default Label;
