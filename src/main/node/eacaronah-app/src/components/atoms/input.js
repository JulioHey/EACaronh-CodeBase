import React from 'react';

import {TextInput} from 'react-native';
import theme from "../../theme/theme";

const MyInput = ({placeholder, hide, value, onInputChange, paddingLeft}) => {
    return (
        <TextInput
            style={{
                paddingHorizontal: theme.spacing.m,
                paddingVertical: theme.spacing.s,
                borderRadius: theme.borderRadius.s,
                fontSize: theme.font.size.xl,
                lineHeight: theme.font.lineHeight.xl,
                borderColor: theme.color.darkBackground,
                borderStyle: "solid",
                borderWidth: 1,
                width: "100%",
                paddingLeft: paddingLeft ? paddingLeft : theme.spacing.s
            }
            }
            placeholder={placeholder}
            value={value}
            secureTextEntry={hide}
            onChange={onInputChange}
        />
    )

}


export default MyInput;