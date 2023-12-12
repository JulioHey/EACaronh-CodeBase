import {View} from "react-native";

const Separator = ({direction}) => {
    return (
        <View
            style={{
                height: direction == "horizontal" ? "100%" : 1,
                width: direction == "horizontal" ? 1 : "100%",
                backgroundColor: "#CED0CE",
            }}
        />
    )
}

export default Separator;