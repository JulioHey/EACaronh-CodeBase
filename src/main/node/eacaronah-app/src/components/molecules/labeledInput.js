import {useContext, useState} from "react";
import {View} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Label from "../atoms/label";
import Input from "../atoms/input";
import MaskedInput from "../atoms/maskedInput";
import theme from "../../theme/theme";

import { isEmpty } from "../../utils/validation";
import {ThemeContext} from "../../store/context/theme";

const LabeledInput = ({title, value, onChange, invalid, mask}) => {
    const {appTheme} = useContext(ThemeContext);
    const [hide, setHide] = useState(title == "Senha" || title == "Digite sua nova senha");

    return (<View
        style={{
            alignItems: "flex-start", gap: appTheme.spacing.m, width: "100%",
        }}
    >
        <Label text={title} invalid={invalid}/>
        {title == "Senha" || title == "Digite sua nova senha" ?
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
            : <Input invalid={invalid} value={value} onInputChange={onChange}/>
        }
    </View>)
}

export default LabeledInput;
