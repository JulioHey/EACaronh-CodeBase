import theme from "../../theme/theme";
import LabeledInput from "../molecules/labeledInput";
import ElevatedButton from "../atoms/elevatedButton";
import Label from "../atoms/label";
import {Text, View} from "react-native";
import { isEmpty } from "../../utils/validation";
import Dropdown from "../../components/atoms/dropdown";


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
                } else if (value.type == "selectDropdown") {
                  return (
                    <View
                        style={{
                            width: "100%",
                        }}
                    >
                      <Label text={value.title} invalid={value.invalid}/>
                      <Dropdown data={value.options} onSelect={value.onSelect} label="Select..."/>
                    </View>
                  )
                          //style={{
                          //backgroundColor: theme.color.lightBackground,
                          //paddingHorizontal: theme.spacing.m,
                          //paddingVertical: theme.spacing.s,
                          //borderRadius: theme.borderRadius.s,
                          //fontSize: theme.font.size.xl,
                          //lineHeight: theme.font.lineHeight.xl,
                          //width: "100%",
                      //}}
                }
            })}
        </View>
    )
}

export default Forms;
