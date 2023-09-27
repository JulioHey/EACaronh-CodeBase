import {BaseButton} from "react-native";
import {Text} from "react-native";
import theme from "../../theme/theme";

const TextButton = ({title, onClick}) => {
    return (
        <BaseButton style={{}} rippleRadius={1000} rippleColor={theme.color.lightBackground} onPress={onClick}>
            <Text style={
                {
                    fontWeight: "800",
                }
            }>{title}</Text>
        </BaseButton>
    )
}

export default TextButton;
