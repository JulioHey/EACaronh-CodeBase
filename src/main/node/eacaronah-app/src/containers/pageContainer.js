import {View} from "react-native";
import theme from "../theme/theme";


const PageContainer = ({children}) => {
    return (
        <View
            style={{
                paddingHorizontal: theme.spacing.l,
                height: "100%",
                backgroundColor: "white",
            }}
        >
            {children}
        </View>
    )
}

export default PageContainer;