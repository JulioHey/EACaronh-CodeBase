import React, {useContext} from "react";
import {Text, TouchableOpacity} from "react-native";
import {ThemeContext} from "../../store/context/theme";

const ElevatedButton = ({onClick, title}) => {
    const {appTheme} = useContext(ThemeContext)
    return (
        <TouchableOpacity style={{
            backgroundColor: appTheme.color.darkBackground,
            paddingVertical: appTheme.spacing.s,
            width: "100%",
            alignItems: "center",
            borderRadius: 20,
            paddingHorizontal: appTheme.spacing.m,
        }} onPress={onClick}>
            <Text style={{color: "white", fontSize: appTheme.font.size.l, fontWeight: "800"}}>{title}</Text>
        </TouchableOpacity>
    )
}

export default ElevatedButton;