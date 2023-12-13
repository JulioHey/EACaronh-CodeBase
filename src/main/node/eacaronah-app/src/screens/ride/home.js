import IconInput from "../../components/molecules/iconInput";
import IconButton from "../../components/atoms/iconButton";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import RideList from "../../components/organism/rideList";
import RideRequestList from "../../components/organism/rideRequestList";
import {useContext, useEffect, useState} from "react";
import {RideService} from "../../store/services/ride";
import {AuthContext} from "../../store/context/auth";
import {TouchableOpacity, View} from "react-native";
import {AppContext} from "../../store/context/app";

const RideHome = () => {
    const {token} = useContext(AuthContext);
    const {navigation} = useContext(AppContext);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        RideService.GetRequests(token).then(res => {
            if (res.status === 200 ) {
                if (res.data.ride_requests.ride_requests.length > 0) {
                    setRequests(res.data.ride_requests.ride_requests)
                }
            } else {
                console.log(res.data)
            }
        })
    }, [])

    return (
        <View
            style={{
                paddingHorizontal: 20
            }}
        >
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("searchRide")
                }}
            >
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
                        <FontAwesome5
                            name="calendar"
                            size={25}
                            color="white"
                        />
                    </IconButton>}
                />
            </TouchableOpacity>

            <RideRequestList
                rideRequests={requests}
            />
        </View>

    );
}

export default RideHome;