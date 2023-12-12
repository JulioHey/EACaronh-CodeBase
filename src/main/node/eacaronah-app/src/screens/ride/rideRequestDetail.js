import PageContainer from "../../containers/pageContainer";
import Header from "../../components/molecules/header";
import IconButtonFlat from "../../components/atoms/iconButtonFlat";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useContext} from "react";
import {ThemeContext} from "../../store/context/theme";
import {AppContext} from "../../store/context/app";
import DetailMap from "../../components/molecules/detailMap";
import {Dimensions, Text, View} from "react-native";
import {RideToMap} from "../../utils/ride";
import IconButton from "../../components/atoms/iconButton";
import AntDesign
    from "react-native-vector-icons/AntDesign";
import {RideRequestToMap} from "../../utils/rideRequest";

const RideRequestDetail = ({route}) => {
    const {rideReq} = route.params;
    console.log(rideReq)

    const {appTheme} = useContext(ThemeContext);
    const {navigation} = useContext(AppContext);

    return (
        <PageContainer>
            <Header
                heading={(
                    <IconButtonFlat
                        style={{
                            width: 45,
                            paddingLeft: appTheme.spacing.l,
                        }}
                        icon={<Ionicons
                            name="chevron-back-circle"
                            size={45}
                            color={appTheme.color.darkBackground}
                        />}
                        onClick={() => navigation.navigate("home")}
                    />)}
                pageTitle="Detalhes da Solicitação"
            />
            <View
                style={{
                    height: Dimensions.get('window').height - 140,
                    backgroundColor: appTheme.color.lightBackground,
                    paddingHorizontal: appTheme.spacing.l,
                    paddingVertical: appTheme.spacing.xl,
                    justifyContent: "space-between",
                }}
            >
                <View
                    style={{
                        gap: appTheme.spacing.l,
                    }}
                >
                    <DetailMap title="Detalhes da Solicitação"
                               ride={rideReq !== undefined ? RideRequestToMap(rideReq) : {}}/>

                </View>
                <View
                    style={{
                        gap: 20,
                    }}
                >
                    <IconButton
                        style={{
                            flexDirection: "row",
                            backgroundColor: "green",
                            width: Dimensions.get('window').width - 2 * appTheme.spacing.l,
                            gap: 10,
                        }}
                    >
                        <Text
                            style={{
                                color: "white",
                                fontSize: 20,
                            }}
                        >Aceitar Pedido</Text>
                        <AntDesign
                            name="checkcircle"
                            size={25}
                            color="white"
                        />
                    </IconButton>
                    <IconButton
                        style={{
                            flexDirection: "row",
                            backgroundColor: "red",
                            width: Dimensions.get('window').width - 2 * appTheme.spacing.l,
                            gap: 10,
                        }}
                    >
                        <Text
                            style={{
                                color: "white",
                                fontSize: 20,
                            }}
                        >Rejeitar Pedido</Text>
                        <AntDesign
                            name="closecircle"
                            size={25}
                            color="white"
                        />
                    </IconButton>
                </View>


            </View>
        </PageContainer>
    )
}

export default RideRequestDetail