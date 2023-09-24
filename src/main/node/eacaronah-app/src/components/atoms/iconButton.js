import React from "react";
import MaterialCommunityIcons
    from "react-native-vector-icons/MaterialCommunityIcons";
import theme from "../../theme/theme";
import {View} from "react-native";
import {BaseButton} from "react-native-gesture-handler";

const IconButton = ({children, style, onClick}) => {
    return (
        <BaseButton onPress={onClick}>
            <View
                style={
                    {
                        borderRadius: theme.borderRadius.xll,
                        backgroundColor: theme.color.darkBackground,
                        padding: theme.spacing.s,
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