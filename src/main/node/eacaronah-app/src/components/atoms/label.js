import {Text} from "react-native";
import theme from "../../theme/theme";
import {useContext} from "react";
import {ThemeContext} from "../../store/context/theme";

const Label = ({text, style}) => {
    const {appTheme} = useContext(ThemeContext)
    return (
        <Text style={
            style ?? {
                fontSize: appTheme.font.size.m,
                fontWeight: "600",
            }
        }>{text}</Text>
    )
}

export default Label;