import React from "react";
import {Text} from "react-native";
import {BaseButton} from "react-native-gesture-handler";
import theme from "../../theme/theme";

const ElevatedButton = ({onClick, title}) => {
    return (
        <BaseButton style={{
            backgroundColor: theme.color.darkBackground,
            paddingVertical: theme.spacing.s,
            width: "100%",
            alignItems: "center",
            borderRadius: theme.borderRadius.xll
        }} onPress={onClick}>
            <Text style={{color: "white", fontSize: theme.font.size.l, fontWeight: "800"}}>{title}</Text>
        </BaseButton>
    )
}

export default ElevatedButton;