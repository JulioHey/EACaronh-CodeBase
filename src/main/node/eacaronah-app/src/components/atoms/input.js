import React from 'react';

import {TextInput} from 'react-native';
import theme from "../../theme/theme";

const MyInput = ({hide, value, onInputChange, invalid}) => {
    return (
        <TextInput
            style={{
                backgroundColor: theme.color.lightBackground,
                paddingHorizontal: theme.spacing.m,
                paddingVertical: theme.spacing.s,
                borderRadius: theme.borderRadius.s,
                fontSize: theme.font.size.xl,
                lineHeight: theme.font.lineHeight.xl,
                borderColor: invalid ? theme.color.invalid : "",
                borderWidth: invalid ? theme.borderWidth : 0,
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
