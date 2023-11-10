import {useState, useRef} from "react";
import {View} from "react-native";
import MaterialCommunityIcons
    from "react-native-vector-icons/MaterialCommunityIcons";

import Label from "../atoms/label";
import UniqueInput from "../atoms/uniqueInput";
import TextButton from "../atoms/textButton"
import theme from "../../theme/theme";

const OTPInput = ({title, value, onChange, invalid}) => {
    const [code, setCode] = useState(['', '', '', '']);
    const inputs = [];

    const handleCode = (value, index) => {
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);
        onChange(newCode.join(""));

        if (value && index < newCode.length - 1) {
            inputs[index + 1].focus();
        }
    }

    const handleBackspace = (e) => {
        if (e.keyCode === 8) {
            setCode(['', '', '', '']);
            inputs[0].focus();
        }
    }

    return (<View
        style={{
            alignItems: "center", gap: theme.spacing.m, width: "100%",
        }}
    >
        <Label text={title} invalid={invalid}/>
        <View style={{flexDirection: "row", justifyContent: "space-around"}}>
            {code.map((digit, index) => (
                <UniqueInput
                    key={index}
                    invalid={invalid}
                    value={digit}
                    keyboardType="numeric"
                    onInputChange={(e) => handleCode(e.target.value, index)}
                    onKeyPress={(e) => handleBackspace(e)}
                    ref={(input) => inputs[index] = input}
                />
            ))}
        </View>

    </View>)
}

export default OTPInput;
