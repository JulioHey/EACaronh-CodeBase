import React, {useContext} from "react";
import MaterialCommunityIcons
    from "react-native-vector-icons/MaterialCommunityIcons";
import theme from "../../theme/theme";
import {View} from "react-native";
import {BaseButton} from "react-native-gesture-handler";
import {ThemeContext} from "../../store/context/theme";

const IconButton = ({children, style, onClick}) => {
    const {appTheme} = useContext(ThemeContext)
    return (
        <BaseButton onPress={onClick}>
            <View
                style={
                    {
                        borderRadius: appTheme.borderRadius.xll,
                        backgroundColor: appTheme.color.darkBackground,
                        padding: appTheme.spacing.s,
                        width: "40px",
                        height: "40px",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        ...style
                    }
                }
            >
                {children}
            </View>
        </BaseButton>);
}

export default IconButton;