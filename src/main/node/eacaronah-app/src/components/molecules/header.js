import theme from "../../theme/theme";
import {Text, View} from "react-native";
import {useContext} from "react";
import {ThemeContext} from "../../store/context/theme";

const HeaderTitle = ({pageTitle, heading, trailling}) => {
    const {appTheme} = useContext(ThemeContext)
    return (
      <View style={{
          width: "100%",
          marginBottom: appTheme.spacing.xl,
          paddingTop: appTheme.spacing.l,
          paddingBottom: appTheme.spacing.xl,
          paddingRight: appTheme.spacing.s,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          height: 80,
          backgroundColor: "white",
      }}>
          <View style={{
              position: "absolute",
              left: appTheme.spacing.s,
              top: appTheme.spacing.l,
          }}>
              {heading}
          </View>
          <Text style={{
            fontSize: appTheme.font.size.xl,
            fontWeight: appTheme.font.weight.b
          }}>
            {pageTitle}
          </Text>
          <View style={{
              position: "absolute",
              right: appTheme.spacing.s,
              top: appTheme.spacing.l,
          }}>
              {trailling}
          </View>
      </View>
    );
}

export default HeaderTitle;
