import React, {useContext} from 'react';

import {TextInput} from 'react-native';
import theme from "../../theme/theme";
import {ThemeContext} from "../../store/context/theme";

const MyInput = ({hide, value, onInputChange, invalid}) => {
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
          borderWidth: invalid ? appTheme.borderWidth : 0,
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
