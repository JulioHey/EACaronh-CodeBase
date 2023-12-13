import {Dimensions, TouchableOpacity, View} from "react-native";
import Paragraph from "../atoms/Paragraph";

const Modal = ({title, subtitle, buttonText, onPress}) => {
    return (<View
        style={{
            top: 0,
            position: "fixed",
            zIndex: 100,
            backgroundColor: "rgba(0,0,0,0.15)",
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            justifyContent: "center",
            alignItems: "center",
        }}
    >
        <View
            style={{
                backgroundColor: "white",
                borderRadius: 10,
                padding: 20,
                width: "80%",
                flexDirection: "column",
                alignItems: "center",
                gap: 20
            }}
        >
            <Paragraph type={"h4"}>{title}</Paragraph>
            {subtitle && <Paragraph type={"h5"}>{subtitle}</Paragraph>}
            {onPress &&
                <TouchableOpacity
                    onPress={onPress}
                >
                    <Paragraph type={"h5"}>{buttonText}</Paragraph>
                </TouchableOpacity>}
        </View>
    </View>)
}

export default Modal;