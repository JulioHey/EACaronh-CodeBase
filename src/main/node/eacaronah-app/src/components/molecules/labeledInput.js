import {useState} from "react";
import {View} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Label from "../atoms/label";
import Input from "../atoms/input";
import theme from "../../theme/theme";

const LabeledInput = ({title, value, onChange}) => {
    const [hide, setHide] = useState(title == "Password");
    const style = useState({
                backgroundColor: theme.color.lightBackground,
                paddingHorizontal: theme.spacing.m,
                paddingVertical: theme.spacing.s,
                borderRadius: theme.borderRadius.s,
                fontSize: theme.font.size.xl,
                lineHeight: theme.font.lineHeight.xl,
                width: "100%",
            })

    return (<View
        style={{
            alignItems: "flex-start", gap: theme.spacing.m, width: "100%",
        }}
    >
        <Label text={title}/>
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
                <Input hide={hide} value={value} onInputChange={onChange} style={style}/>
            </View>
            : <Input value={value} onInputChange={onChange} style={style}/>
        }
    </View>)
}

export default LabeledInput;
