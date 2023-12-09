import {BaseButton} from "react-native-gesture-handler";
import {Text} from "react-native";
import theme from "../../theme/theme";
import {useContext} from "react";
import {ThemeContext} from "../../store/context/theme";

const TextButton = ({title, onClick}) => {
    const {appTheme} = useContext(ThemeContext)
    return (
        <BaseButton style={{}} rippleRadius={1000} rippleColor={appTheme.color.lightBackground} onPress={onClick}>
            <Text style={
                {
                    fontWeight: "800",
                }
            }>{title}</Text>
        </BaseButton>
    )
}

export default TextButton;