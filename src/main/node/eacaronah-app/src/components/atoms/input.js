import React from 'react';

import {TextInput} from 'react-native';
import theme from "../../theme/theme";

const MyInput = ({hide, value, onInputChange}) => {
    return (
        <TextInput
            style={{
                backgroundColor: theme.color.lightBackground,
                paddingHorizontal: theme.spacing.m,
                paddingVertical: theme.spacing.s,
                borderRadius: theme.borderRadius.s,
                fontSize: theme.font.size.xl,
                lineHeight: theme.font.lineHeight.xl,
                width: "100%",
            }
            }
            value={value}
            secureTextEntry={hide}
            onChange={onInputChange}
        />
    )

}


export default MyInput;