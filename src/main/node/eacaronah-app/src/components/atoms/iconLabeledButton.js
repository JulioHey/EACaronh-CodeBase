import {BaseButton} from "react-native-gesture-handler";
import {View, Text} from "react-native";
import theme from "../../theme/theme";
import Label from "./label";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const IconLabeledButton = ({title, iconName, onClick}) => {
    return (
      <View style={{
        flexDirection: "column",
        alignItems: "center",
      }}>
         <MaterialIcons name={iconName} size={60} color="white"/>
         <Label text={title} />
      </View>
    )
}

export default IconLabeledButton;
