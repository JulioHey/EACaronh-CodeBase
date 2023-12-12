import {useContext, useState} from "react";
import {View} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Label from "../atoms/label";
import Input from "../atoms/input";
import MaskedInput from "../atoms/maskedInput";
import theme from "../../theme/theme";
import {ThemeContext} from "../../store/context/theme";

const LabeledInput = ({title, value, onChange, invalid, mask, placeholder}) => {
    const [hide, setHide] = useState(title == "Password");
    const {appTheme} = useContext(ThemeContext)

    return (<View
        style={{
            alignItems: "flex-start", gap: appTheme.spacing.m, width: "100%",
        }}
    >
        <Label text={title} invalid={invalid}/>
        {title == "Password" ?
            <View style={{
                position: "relative",
                width: "100%",
            }}>
                <MaterialCommunityIcons name="eye-off"
                                        size={appTheme.font.size.xxl}
                                        color={appTheme.color.darkBackground}
                                        onPress={() => {
                                            setHide(!hide);
                                        }}
                                        style={{
                                            position: "absolute",
                                            right: appTheme.spacing.m,
                                            top: appTheme.spacing.m,
                                            cursor: "pointer",
                                        }}/>
                <Input invalid={invalid} hide={hide} value={value} onInputChange={onChange}/>
            </View>
            : mask ? <MaskedInput mask={mask} invalid={invalid} value={value} onInputChange={onChange}/>
            : <Input invalid={invalid} placeholder={placeholder} value={value} onInputChange={onChange}/>
        }
    </View>)
}

export default LabeledInput;
