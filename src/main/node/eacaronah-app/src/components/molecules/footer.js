import { View } from "react-native";
import theme from "../../theme/theme";
import Label from "../atoms/label";
import IconLabeledButton from "../atoms/iconLabeledButton";

const Footer = () => {
    return (
      <View style={{
          width: "100%",
          height: "10vh",
          backgroundColor: theme.color.darkBackground,
          position: "relative",
          borderTopLeftRadius: theme.borderRadius.l,
          borderTopRightRadius: theme.borderRadius.l,
          flexDirection: "row",
          justifyContent: "space-around",
      }}>
        <IconLabeledButton title="Página Inicial" iconName="home" />
        <IconLabeledButton title="Serviços" iconName="apps" />
        <IconLabeledButton title="Perfil" iconName="person" />
      </View>
    );
}

export default Footer;
