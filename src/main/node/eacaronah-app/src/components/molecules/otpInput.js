import {useState} from "react";
import {View} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Label from "../atoms/label";
import UniqueInput from "../atoms/uniqueInput";
import TextButton from "../atoms/textButton"
import theme from "../../theme/theme";

const OTPInput = ({title, value, onChange, invalid}) => {


    const [code1, setCode1] = useState("");
    const [code2, setCode2] = useState("");
    const [code3, setCode3] = useState("");
    const [code4, setCode4] = useState("");

  const handleCodes = (value, n) => {
    switch (n){
      case 1:
        setCode1(value);
      case 2:
        setCode2(value);
      case 3:
        setCode3(value);
      case 4:
        setCode4(value);
    }
  }

    return (<View
        style={{
            alignItems: "center", gap: theme.spacing.m, width: "100%",
        }}
    >
        <Label text={title} invalid={invalid}/>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <UniqueInput invalid={invalid} value={value} onInputChange={ (e) => handleCodes(e.target.value, 1) }/>
          <UniqueInput invalid={invalid} value={value} onInputChange={ (e) => handleCodes(e.target.value, 2) }/>
          <UniqueInput invalid={invalid} value={value} onInputChange={ (e) => handleCodes(e.target.value, 3) }/>
          <UniqueInput invalid={invalid} value={value} onInputChange={ (e) => handleCodes(e.target.value, 4) }/>
        </View>

    </View>)
}

export default OTPInput;
