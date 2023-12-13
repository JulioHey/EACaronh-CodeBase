import {View} from "react-native";

const SizedBox = ({height, width}) => {
    return <View
        style={{
            width: width,
            height: height,
        }}
    />
}

export default SizedBox;