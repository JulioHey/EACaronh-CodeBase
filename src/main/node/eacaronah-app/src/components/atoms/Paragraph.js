import {Text} from "react-native";

const Paragraph = ({color, type, children, styles}) => {
    return <Text
        style={{
            ...customStyles[type],
            color: color,
            ...styles
        }}
    >
        {children}
    </Text>
}

const customStyles = {
    "h3": {
        fontSize: 22,
        fontHeight: 40,
        fontWeight: "bold"
    },
    "h4": {
        fontSize: 15,
        fontHeight: 40,
        fontWeight: "bold"
    },
    "h5": {
        fontSize: 11,
        fontHeight: 24,
        fontWeight: "bold"
    },
    "p2": {
        fontSize: 16,
        fontHeight: 26,
    },
    "p": {
        fontSize: 11,
        fontHeight: 24,
    }
}

export default Paragraph;