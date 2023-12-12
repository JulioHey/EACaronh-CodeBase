import { useContext} from "react";
import {AppContext} from "../../store/context/app";
import Card from "./card";
import {ToFullDate} from "../../utils/date";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {RideRequestToMap} from "../../utils/rideRequest";

const RideRequestCard = ({rideReq}) => {
    const {navigation} = useContext(AppContext)
    return (
       <Card
           title={ToFullDate(rideReq.ride.date, rideReq.ride.time)}
           info={RideRequestToMap(rideReq)}
           onPress={() => {
               navigation.navigate("rideDetailRider", {
                   ride: rideReq.ride,
                   rideRequestID: rideReq.id,
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

export default RideRequestCard;