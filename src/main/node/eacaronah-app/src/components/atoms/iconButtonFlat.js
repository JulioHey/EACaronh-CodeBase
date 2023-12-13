import {TouchableOpacity} from "react-native";
import {Dimensions, Text} from "react-native";


const IconButtonFlat = ({icon, name, onClick, color, style}) => {
    return (<TouchableOpacity
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
    </TouchableOpacity>)
}

export default IconButtonFlat;
