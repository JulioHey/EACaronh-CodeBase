import {Text, View} from "react-native";
import ElevatedButton from "../components/atoms/elevatedButton";
import theme from "../theme/theme";
import {AuthContext} from "../store/context/auth";
import {useContext, useState} from "react";
import Header from "../components/molecules/header";
import IconInput from "../components/molecules/iconInput";
import IconButton from "../components/atoms/iconButton";
import MaterialIcons from "react-native-vector-icons/AntDesign";
import RideCard from "../components/molecules/rideCard";
import RideList from "../components/organism/rideList";

const Home = () => {
    const {logout} = useContext(AuthContext);

    const [rides, setRides] = useState([
        // {
        //     title: "Titulo",
        //     time: "Tempo",
        //     date: "Data"
        // }
    ]);

    return (
        <View
            style={{
                paddingHorizontal: theme.spacing.m
            }}
        >
            <Header
                pageTitle={"Home"}
            />
            <IconInput
                placeholder={"Escolha seu destino"}
                trailling={<IconButton
                    style={{
                        flexDirection: "row",
                        width: 120,
                        gap: 10,
                        color: "white",
                        fontSize: 20,
                    }}
                >
                    Data
                    <MaterialIcons
                        name="calendar"
                        size={25}
                        color="white"
                    />
                </IconButton>}
            />
            <RideList rides={rides}/>
            <ElevatedButton title={"Logout"} color={theme.color.darkBackground} onClick={logout}/>
        </View>
    )
}

export default Home;