import {BaseButton} from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/Ionicons";
import {Dimensions, Text} from "react-native";


const IconButtonFlat = ({icon, name, onClick, color, style}) => {
    return (<BaseButton
        onPress={onClick}
        style={{
            width: Dimensions.get('window').width / 3,
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            ...style,
        }}
    >
        {icon}
        <Text
            style={{
                color: color ?? "white",
            }}
        >
            {name}
        </Text>
    </BaseButton>)
}

export default IconButtonFlat;
