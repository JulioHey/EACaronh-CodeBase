import React from 'react';

import {View, TextInput} from 'react-native';
import theme from "../../theme/theme";
import MaskInput from 'react-native-mask-input';

const MaskedInput = ({hide, value, onInputChange, invalid, mask}) => {
  return (
    <View>
    <MaskInput
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
