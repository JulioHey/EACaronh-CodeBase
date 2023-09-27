import {useState} from "react";
import {View} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import Label from "../atoms/label";
import Input from "../atoms/input";
import theme from "../../theme/theme";

const SearchInput = ({title, value, onChange}) => {
    const [hide, setHide] = useState(title == "Password");

    return (<View
        style={{
          alignItems: "center",
          //gap: theme.spacing.xl,
          width: "100%",
          flexDirection: "row",
          justifyContent: "center",
        }}
    >
      <MaterialIcons name="search" size={theme.spacing.xl} style={{
        backgroundColor: theme.color.lightBackground,
        padding: theme.spacing.s,
        lineHeight: theme.font.lineHeight.l,
        borderRadius: theme.borderRadius.s,
        alignItems: "center",
        }}
      />
      <Input value={value} onInputChange={onChange} style={{
          backgroundColor: theme.color.lightBackground,
          paddingHorizontal: theme.spacing.xl,
          paddingVertical: theme.spacing.s,
          borderRadius: theme.borderRadius.s,
          fontSize: theme.font.size.xl,
          lineHeight: theme.font.lineHeight.l,
          flex: 1
        }}
      />
    </View>)
}

export default SearchInput;
