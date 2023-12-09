import React, {useContext} from "react";
import {Text} from "react-native";
import {BaseButton} from "react-native-gesture-handler";
import theme from "../../theme/theme";
import {ThemeContext} from "../../store/context/theme";

const ElevatedButton = ({onClick, title}) => {
    const {appTheme} = useContext(ThemeContext)
    return (
        <BaseButton style={{
            backgroundColor: appTheme.color.darkBackground,
            paddingVertical: appTheme.spacing.s,
            width: "100%",
            alignItems: "center",
            borderRadius: appTheme.borderRadius.xll
        }} onPress={onClick}>
            <Text style={{color: "white", fontSize: appTheme.font.size.l, fontWeight: "800"}}>{title}</Text>
        </BaseButton>
    )
}

export default ElevatedButton;