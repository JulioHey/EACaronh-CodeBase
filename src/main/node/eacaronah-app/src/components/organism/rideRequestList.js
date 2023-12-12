import {useContext, useState} from "react";
import {Text, View} from "react-native";
import RideRequestCard from "../molecules/rideRequestCard";
import {ThemeContext} from "../../store/context/theme";

const RideRequestList = ({rideRequests}) => {
    const {appTheme} = useContext(ThemeContext)

    return (
        <View
            style={{
                paddingVertical: appTheme.spacing.m,
                paddingHorizontal: appTheme.spacing.l,
            }}
        >
            {rideRequests.length == 0 ?
                <View>
                    <Text>
                        Parece que você ainda não solicitou nenhuma carona, solicite sua primeira carona
                    </Text>
                </View> :
                <View
                    style={{
                        gap: appTheme.spacing.m,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 20,
                        }}
                    >
                        Suas solicitações de carona
                    </Text>
                    {rideRequests.map((request) => {
                        return (
                            <View key={request.rideId}>
                                <RideRequestCard rideReq={request}/>
                            </View>
                        )
                    })}
                </View>
            }
        </View>
    );
}

export default RideRequestList;