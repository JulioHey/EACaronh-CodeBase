import React from 'react';

import {TextInput} from 'react-native';
import theme from "../../theme/theme";

const MyInput = ({hide, value, onInputChange, style}) => {
    return (
        <TextInput
            style={style}
            value={value}
            secureTextEntry={hide}
            onChange={onInputChange}
        />
    )

}


export default MyInput;
