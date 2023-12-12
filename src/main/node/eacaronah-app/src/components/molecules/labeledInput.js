import {useContext, useState} from "react";
import {View} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Label from "../atoms/label";
import Input from "../atoms/input";
import theme from "../../theme/theme";
import {ThemeContext} from "../../store/context/theme";

const LabeledInput = ({title, value, onChange, placeholder}) => {
    const [hide, setHide] = useState(title == "Password");
    const {appTheme} = useContext(ThemeContext)

    return (<View
        style={{
            alignItems: "flex-start", gap: appTheme.spacing.m, width: "100%",
        }}
    >
        <Label text={title}/>
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
                <Input hide={hide} value={value} onInputChange={onChange}/>
            </View>
            : <Input placeholder={placeholder} value={value} onInputChange={onChange}/>
        }
    </View>)
}

export default LabeledInput;