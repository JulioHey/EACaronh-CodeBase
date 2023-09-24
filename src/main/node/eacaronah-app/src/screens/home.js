import {Text, View} from "react-native";
import ElevatedButton from "../components/atoms/elevatedButton";
import theme from "../theme/theme";
import {AuthContext} from "../store/context/auth";
import {useContext} from "react";

const Home = () => {
    const {logout} = useContext(AuthContext);
    return (
        <View>
            <Text>Home</Text>
            <ElevatedButton title={"Logout"} color={theme.color.darkBackground} onClick={logout}/>
        </View>
    )
}

export default Home;