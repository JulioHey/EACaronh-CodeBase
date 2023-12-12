import React, {useContext} from 'react';

import {TextInput} from 'react-native';
import {ThemeContext} from "../../store/context/theme";

const MyInput = ({placeholder, hide, value, onInputChange, invalid, paddingLeft, style}) => {
    const {appTheme} = useContext(ThemeContext)

    return (
        <TextInput
            style={{
                paddingHorizontal: appTheme.spacing.m,
                paddingVertical: appTheme.spacing.s,
                borderRadius: appTheme.borderRadius.s,
                fontSize: appTheme.font.size.xl,
                lineHeight: appTheme.font.lineHeight.xl,
                borderColor: invalid ? appTheme.color.invalid : appTheme.color.darkBackground,
                borderStyle: "solid",
                borderWidth: 1,
                width: "100%",
                paddingLeft: paddingLeft ? paddingLeft : appTheme.spacing.s,
                ...style
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
