import theme from "../../theme/theme";
import LabeledInput from "../molecules/labeledInput";
import ElevatedButton from "../atoms/elevatedButton";
import {Text, View} from "react-native";
import {useContext} from "react";
import {ThemeContext} from "../../store/context/theme";


const Forms = ({formsOptions, justifyContent, spacing}) => {
    const {appTheme} = useContext(ThemeContext)
    return (
        <View
            style={{
                gap: spacing ? spacing : appTheme.spacing.xl,
                alignItems: "center",
                justifyContent: justifyContent,
            }}
        >
            {formsOptions.map((value, index) => {
                if (value.type == "input") {
                    return <LabeledInput key={index} {...value} />
                } else if (value.type == "elevetedButton") {
                    return <ElevatedButton key={index} {...value} />
                } else if (value.type == "spanTextButton") {
                    return (<Text key={index}>
                        {value.text}
                        <Text
                            style={{
                                fontWeight: "800",
                            }}
                            onPress={value.onClick}>
                            {value.callToAction}
                        </Text>
                    </Text>)
                }
            })}
        </View>
    )
}

export default Forms;