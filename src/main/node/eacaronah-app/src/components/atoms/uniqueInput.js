import React, {useContext} from 'react';

import {TextInput} from 'react-native';
import theme from "../../theme/theme";
import {ThemeContext} from "../../store/context/theme";

const UniqueInput = React.forwardRef(({hide, value, onInputChange, onKeyPress, invalid}, ref) => {
    const {appTheme} = useContext(ThemeContext)

    return (
        <TextInput
            style={{
                backgroundColor: appTheme.color.lightBackground,
                paddingHorizontal: appTheme.spacing.m,
                paddingVertical: appTheme.spacing.s,
                borderRadius: appTheme.borderRadius.s,
                fontSize: appTheme.font.size.xl,
                lineHeight: appTheme.font.lineHeight.xl,
                borderColor: invalid ? appTheme.color.invalid : "",
                borderWidth: invalid ? appTheme.borderWidth : "",
                width: "15%",
            }
            }
            maxLength="1"
            value={value}
            secureTextEntry={hide}
            onChange={onInputChange}
            onKeyPress={onKeyPress}
            ref={ref}
        />
    )

})


export default UniqueInput;
