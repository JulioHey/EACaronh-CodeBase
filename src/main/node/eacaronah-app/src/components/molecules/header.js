import {View, Text} from "react-native";
import theme from "../../theme/theme";

const Header = ({pageTitle, heading, trailling}) => {
    return (
      <View style={{
          width: "100%",
          paddingTop: theme.spacing.l,
          paddingBottom: theme.spacing.xl,
          paddingRight: theme.spacing.s,
          marginBottom: theme.spacing.xl,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          height: 80,
      }}>
          <View style={{
              position: "absolute",
              left: theme.spacing.s,
              top: theme.spacing.l,
          }}>
              {heading}
          </View>
          <Text style={{
            fontSize: theme.font.size.xxl,
            fontWeight: theme.font.weight.b
          }}>
            {pageTitle}
          </Text>
          <View style={{
              position: "absolute",
              right: theme.spacing.s,
              top: theme.spacing.l,
          }}>
              {trailling}
          </View>
      </View>
    );
}

export default Header;
