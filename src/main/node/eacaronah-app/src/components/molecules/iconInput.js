import {View} from "react-native";
import Input from "../atoms/input";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const IconInput = ({placeholder, trailling}) => {
    return (
        <View
            style={{
                position: "relative"
            }}
        >
            <View
                style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                }}
            >
                <MaterialIcons
                    name="search"
                    size={30}
                />
            </View>
            <View
                style={{
                    position: "absolute",
                    top: "5px",
                    right: "10px",
                }}
            >
                {trailling}
            </View>
            <Input
                placeholder={placeholder}
                paddingLeft={"40px"}
            />
        </View>
    )
}

export default IconInput;