import React, {useContext} from 'react';

import {View, TextInput} from 'react-native';
import theme from "../../theme/theme";
import MaskInput from 'react-native-mask-input';
import {ThemeContext} from "../../store/context/theme";

const MaskedInput = ({hide, value, onInputChange, invalid, mask}) => {
    const {appTheme} = useContext(ThemeContext)
  return (
    <View
        style={{
            width: "100%",
        }}
    >
    <MaskInput
        style={{
            backgroundColor: appTheme.color.lightBackground,
            paddingHorizontal: appTheme.spacing.m,
            paddingVertical: appTheme.spacing.s,
            borderRadius: appTheme.borderRadius.s,
            fontSize: appTheme.font.size.xl,
            lineHeight: appTheme.font.lineHeight.xl,
            borderColor: invalid ? appTheme.color.invalid : "",
            borderWidth: invalid ? appTheme.borderWidth : 0,
            width: "100%",
        }}
        value={value}
        secureTextEntry={hide}
        onChange={onInputChange}
        mask={mask}
    />
    </View>
  )
}


export default MaskedInput;
