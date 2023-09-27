import React from 'react';

import {TextInput} from 'react-native';
import theme from "../../theme/theme";

const UniqueInput = React.forwardRef(({hide, value, onInputChange, onKeyDown, invalid}, ref) => {
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
                borderWidth: invalid ? theme.borderWidth : "",
                width: "15%",
            }
            }
            maxLength="1"
            value={value}
            secureTextEntry={hide}
            onChange={onInputChange}
            onKeyDown={onKeyDown}
            ref={ref}
        />
    )

})


export default UniqueInput;
