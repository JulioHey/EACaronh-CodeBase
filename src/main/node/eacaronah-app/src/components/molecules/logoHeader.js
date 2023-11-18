import { Image, View } from "react-native";
import theme from "../../theme/theme";

const LogoHeader = () => {
    return (
      <View style={{
          width: "100%",
          height: "10vh",
          marginVertical: theme.spacing.xl,
          position: "relative",
      }}>
        <Image
            style={{
              flex: 1,
              height: null,
              width: null,
              resizeMode: "contain"
            }}
            source={require("../../assets/images/logo.png")}
        />
      </View>
    );
}

export default LogoHeader;
