import IconInput from "../../components/molecules/iconInput";
import IconButton from "../../components/atoms/iconButton";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import RideList from "../../components/organism/rideList";
import RideRequestList from "../../components/organism/rideRequestList";

const RideHome = () => {
    return (
        <>
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
            <RideRequestList />
            <RideList/>
        </>

    );
}

export default RideHome;