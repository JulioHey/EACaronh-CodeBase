import theme from "../../theme/theme";
import LabeledInput from "../molecules/labeledInput";
import ElevatedButton from "../atoms/elevatedButton";
import {Text, View} from "react-native";
import { isEmpty } from "../../utils/validation";


const Forms = ({formsOptions}) => {
    return (
        <View
            style={{
                gap: theme.spacing.xl,
                alignItems: "center",
            }}
        >
            {formsOptions.map((value, index) => {
                if (value.type == "input") {
                    return <LabeledInput mask={value.mask} invalid={value.invalid} key={index} {...value} />
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
