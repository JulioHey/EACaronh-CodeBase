import {useState} from "react";
import {View} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Label from "../atoms/label";
import Input from "../atoms/input";
import MaskedInput from "../atoms/maskedInput";
import theme from "../../theme/theme";

import { isEmpty } from "../../utils/validation";

const LabeledInput = ({title, value, onChange, invalid, mask}) => {
    const [hide, setHide] = useState(title == "Password");

    return (<View
        style={{
            alignItems: "flex-start", gap: theme.spacing.m, width: "100%",
        }}
    >
        <Label text={title} invalid={invalid}/>
        {title == "Password" ?
            <View style={{
                position: "relative",
                width: "100%",
            }}>
                <MaterialCommunityIcons name="eye-off"
                                        size={theme.font.size.xxl}
                                        color={theme.color.darkBackground}
                                        onPress={() => {
                                            setHide(!hide);
                                        }}
                                        style={{
                                            position: "absolute",
                                            right: theme.spacing.m,
                                            top: theme.spacing.m,
                                            cursor: "pointer",
                                        }}/>
                <Input invalid={invalid} hide={hide} value={value} onInputChange={onChange}/>
            </View>
            : mask ? <MaskedInput mask={mask} invalid={invalid} value={value} onInputChange={onChange}/>
            : <Input invalid={invalid} value={value} onInputChange={onChange}/>
        }
    </View>)
}

export default LabeledInput;
