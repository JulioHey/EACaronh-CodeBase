import React from 'react';

import {Text} from 'react-native';
import theme from "../../theme/theme";

const BackgroundText = ({value}) => {
    return (
        <Text
            style={{
                backgroundColor: theme.color.lightBackground,
                paddingHorizontal: theme.spacing.s,
                paddingVertical: theme.spacing.s,
                borderRadius: theme.borderRadius.s,
                fontSize: theme.font.size.l,
                fontWeight: theme.font.weight.b,
                lineHeight: theme.font.lineHeight.xl,
                textAlign: "center",
                width: "100%",
        }}>{value}</Text>
    )
}


export default BackgroundText;
