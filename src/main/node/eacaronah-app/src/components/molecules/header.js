import {View} from "react-native";
import theme from "../../theme/theme";

const Header = ({pageTitle, heading, trailling}) => {
    return (
      <View style={{
          width: "100%",
          paddingTop: theme.spacing.l,
          paddingBottom: theme.spacing.xl,
          paddingRight: theme.spacing.s,
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
          {pageTitle}
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