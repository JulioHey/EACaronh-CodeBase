import React, {useContext} from 'react';

import {Text} from 'react-native';
import theme from "../../theme/theme";
import {ThemeContext} from "../../store/context/theme";

const BackgroundText = ({value}) => {
    const {appTheme} = useContext(ThemeContext)
    return (
        <Text
            style={{
                backgroundColor: appTheme.color.lightBackground,
                paddingHorizontal: appTheme.spacing.s,
                paddingVertical: appTheme.spacing.s,
                borderRadius: appTheme.borderRadius.s,
                fontSize: appTheme.font.size.l,
                fontWeight: appTheme.font.weight.b,
                lineHeight: appTheme.font.lineHeight.xl,
                textAlign: "center",
                width: "100%",
        }}>{value}</Text>
    )
}


export default BackgroundText;
