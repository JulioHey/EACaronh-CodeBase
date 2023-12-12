import FontAwesome from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity, View} from "react-native";
import { useContext} from "react";
import {AppContext, RIDE} from "../../store/context/app";
import {ThemeContext} from "../../store/context/theme";
import { ToMapCard} from "../../utils/ride";
import {ToFullDate} from "../../utils/date";
import Paragraph from "../atoms/Paragraph";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Card from "./card";

const RideCard = ({ride}) => {
    const {navigation} = useContext(AppContext)

    return (
        <Card
            title={ToFullDate(ride.date, ride.time)}
            info={ToMapCard(ride)}
            onPress={() => {
                navigation.navigate("rideDetailRider", {
                    ride: ride,
                })
            }}
            icon={ <FontAwesome
                name="users"
                color="#000"
                size={50}
            />}
        />

    )
}


export default RideCard;