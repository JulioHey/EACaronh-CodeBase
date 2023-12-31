import {Text} from "react-native";
import theme from "../../theme/theme";
import {ThemeContext} from "../../store/context/theme";
import {useContext} from "react";

const Label = ({text, style, invalid}) => {
    const {appTheme} = useContext(ThemeContext)
    return (
        <Text style={
            style ?? {
                fontSize: appTheme.font.size.m,
                fontWeight: "600",
                color: invalid ? appTheme.color.invalid : ""
            }
        }>{text}</Text>
    )
}

export default Label;
