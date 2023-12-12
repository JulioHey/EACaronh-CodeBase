import PageContainer from "../../containers/pageContainer";
import {Dimensions, TouchableOpacity, View} from "react-native";
import {useContext, useEffect, useState} from "react";
import {ThemeContext} from "../../store/context/theme";
import Ionicons
    from "react-native-vector-icons/Ionicons";
import {AppContext, CAR, RIDE} from "../../store/context/app";
import MaterialCommunityIcons
    from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {AuthContext} from "../../store/context/auth";
import Paragraph from "../../components/atoms/Paragraph";
import AntDesign from "react-native-vector-icons/AntDesign";
import DetailCard from "../../components/molecules/detailCard";
import {ToFullDate} from "../../utils/date";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {RideService} from "../../store/services/ride";
import Feather from "react-native-vector-icons/Feather";
import Modal from "../../components/molecules/modal";
import {errorModal, loadingModal} from "../../utils/loading";

const RideDetailRiderScreen = ({route}) => {
    const {ride, rideRequestID} = route.params;

    const {appTheme} = useContext(ThemeContext);
    const {navigation, isRide} = useContext(AppContext);
    const {user, token} = useContext(AuthContext);

    const [requests, setRequests] = useState([]);
    const [participants, setParticipants] = useState([]);


    const [isParticipantsOpen, setIsParticipantsOpen] = useState(false);
    const [isRequestsOpen, setIsRequestsOpen] = useState(false);

    const [modal, setModal] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const errorModalClose = {
        ...errorModal,
        onPress: () => {
            setIsModalOpen(false)
        },
        buttonText: "Fechar"
    }

    useEffect(() => {
        if (isRide === CAR) {
            updateInfo()
        } else {
            fetchRequests()
        }
    }, [])

    const userAlreadyRequested = rideRequestID !== undefined

    const updateInfo = () => {
        setIsModalOpen(true)
        setModal(loadingModal)
        try {
            fetchRequests();
            fetchParticipants();
            setIsModalOpen(false)
        } catch (e) {
            setModal(errorModalClose)
        }
    }


    const fetchParticipants = () => {
        RideService.GetParticipantsByRide(ride.id, token).then(res => {
            try {
                setParticipants(res.data.participants)
            } catch (e) {
                setModal(errorModalClose)
            }
        })
    }
    const fetchRequests = () => {
        RideService.GetRequestsByRide(ride.id, token).then(res => {
            try {
                setRequests(res.data.ride_requests)
            } catch (e) {
                setModal(errorModalClose)
            }

        })
    }

    const requestRide = () => {
        RideService.RequestRide(ride.id, token).then(res => {
            console.log(res.data)
        })
    }

    const cancelRide = () => {

    }

    const acceptRequest = (requestID) => {
        setIsModalOpen(true)
        setModal(loadingModal)
        RideService.AcceptRequest(requestID, token).then(res => {
            if (res.status === 200) {
                setModal({
                    title: "Sucesso",
                    subtitle: "Você aceitou a solicitação do usuário com sucesso!",
                    onPress: () => {
                        setIsModalOpen(false)
                        updateInfo();
                    },
                    buttonText: "Fechar"
                })
            } else {
                setModal(errorModalClose)
            }
        })
    }

    const rejectRequest = (requestID) => {
        setIsModalOpen(true)
        setModal(loadingModal)
        RideService.DeclineRequest(requestID, token).then(res => {
            if (res.status === 200) {
                setModal({
                    title: "Sucesso",
                    subtitle: "Você rejeitou a solicitação do usuário!",
                    onPress: () => {
                        setIsModalOpen(false)
                        updateInfo();
                    },
                    buttonText: "Fechar"
                })
            } else {
                setModal(errorModalClose)
            }
        })
    }

    const renounceRide = () => {
        setIsModalOpen(true)
        setModal(loadingModal)
        RideService.RenounceRideRequest(rideRequestID, token).then(res => {
            if (res.status === 200) {
                setModal({
                    title: "Sucesso",
                    subtitle: "Você cancelou sua solicitação de carona!",
                    onPress: () => {
                        setIsModalOpen(false)
                        updateInfo();
                    },
                    buttonText: "Fechar"
                })
            } else {
                setModal(errorModalClose)
            }
        })
    }
    return (
        <View
            style={{
                backgroundColor: "white",
                height: "100%",
                position: "relative"
            }}
        >
            {isModalOpen ? (
                <Modal {...modal}/>
            ) : null}
            <View
                style={{
                    width: Dimensions.get('window').width,
                    backgroundColor: appTheme.color.lightBackground,
                    alignItems: "center",
                    position: "relative",
                    paddingTop: 40,
                    paddingBottom: 20,
                    borderBottomRightRadius: 20,
                    borderBottomLeftRadius: 20,
                    gap: 16,
                }}
            >
                <TouchableOpacity
                    style={{
                        position: "absolute",
                        top: appTheme.spacing.l,
                        left: appTheme.spacing.l,
                    }}
                    onPress={() => {
                        navigation.navigate("home")
                    }}
                >

                    <AntDesign
                        name="back"
                        size={30}
                        color={"rgba(0,0,0,0.6)"}
                    />
                </TouchableOpacity>

                <FontAwesome5
                    name="car"
                    size={50}
                    color={appTheme.color.darkBackground}
                />
                <Paragraph type={"h3"}>
                    Olá, {user.name}
                </Paragraph>
            </View>
            <View
                style={{
                    paddingTop: 20,
                    paddingHorizontal: 31,
                    gap: 20,
                }}
            >
                <Paragraph
                    type={"h3"}
                >
                    Detalhes da Carona
                </Paragraph>
                <DetailCard
                    heading={<Ionicons
                        name={"calendar"}
                        size={22}
                        color="black"
                    />}
                    title={<Paragraph type={"p"}>
                        {ToFullDate(ride.date, ride.time)}
                    </Paragraph>}
                />
                <DetailCard
                    heading={<MaterialCommunityIcons
                        name={"map-marker-radius-outline"}
                        size={22}
                        color="black"
                    />}
                    title={<Paragraph type={"p"}>
                        Local: {ride.to_address}
                    </Paragraph>}
                />
                {isRide !== RIDE ? <>
                    <View>
                        <TouchableOpacity
                            onPress={() => {
                                setIsParticipantsOpen(!isParticipantsOpen)
                            }}
                        >
                            <DetailCard
                                control={isParticipantsOpen}
                                borderTop={!isParticipantsOpen}
                                heading={<MaterialCommunityIcons
                                    name={"seatbelt"}
                                    size={22}
                                    color="black"
                                />}
                                title={<Paragraph type={"p"}>
                                    Participantes: {participants.length}
                                </Paragraph>}
                                trailling={participants.length > 0 ?
                                    <FontAwesome
                                        name={"caret-down"}
                                        size={22}
                                        color={appTheme.color.darkBackground}
                                    /> : null}
                            />
                        </TouchableOpacity>
                        {isParticipantsOpen ?
                            participants.map((participant, index) => {
                                return <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("chat", {
                                            userChat: participant,
                                        })
                                    }}
                                >
                                    <DetailCard
                                        control={true}
                                        borderBottom={index !== participants.length - 1}
                                        heading={<Entypo
                                            name={"chat"}
                                            size={22}
                                            color="black"
                                        />}
                                        title={<Paragraph type={"p"}>
                                            Ir para Chat com {participant.name}
                                        </Paragraph>}
                                        trailling={<MaterialIcons
                                            name={"navigate-next"}
                                            size={22}
                                            color={appTheme.color.darkBackground}
                                        />}
                                    />
                                </TouchableOpacity>
                            })
                            : null}
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => {
                                setIsRequestsOpen(true)
                            }}
                        >
                            <DetailCard
                                heading={<AntDesign
                                    name={"exclamationcircle"}
                                    size={22}
                                    color="black"
                                />}
                                title={<Paragraph type={"p"}>
                                    Solicitações: {requests.length}
                                </Paragraph>}
                                trailling={requests.length > 0 ? <FontAwesome
                                    name={"caret-down"}
                                    size={22}
                                    color={appTheme.color.darkBackground}
                                /> : null}
                            />
                        </TouchableOpacity>
                        {isRequestsOpen ?
                            requests.map((request, index) => {
                                return (
                                    <DetailCard
                                        control={true}
                                        borderBottom={index !== requests.length - 1}
                                        heading={<AntDesign
                                            name={"exclamationcircle"}
                                            size={22}
                                            color="black"
                                        />}
                                        title={<Paragraph type={"p"}>
                                            Solicitação de {request.name}
                                        </Paragraph>}
                                        trailling={<>
                                            <TouchableOpacity
                                                onPress={() => acceptRequest(request.id)}
                                            >
                                                <MaterialIcons
                                                    name={"check-circle"}
                                                    size={22}
                                                    color={appTheme.color.darkBackground}
                                                />

                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => rejectRequest(request.id)}
                                            >
                                                <MaterialCommunityIcons
                                                    name={"close-circle"}
                                                    size={22}
                                                    color={"red"}
                                                />
                                            </TouchableOpacity>
                                        </>}
                                    />)
                            })
                            : null}
                    </View>
                </> : null
                }

            </View>
            <View
                style={{
                    bottom: 0,
                    position: "fixed",
                    flexDirection: "row",
                    paddingHorizontal: 31,
                    paddingBottom: 32,
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%"
                }}
            >
                <TouchableOpacity
                    onPress={isRide !== RIDE ? cancelRide : userAlreadyRequested ? () => renounceRide() : requestRide}
                >
                    {isRide !== RIDE ?
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 20,
                            }}
                        >
                            <View
                                style={{
                                    padding: 5,
                                    backgroundColor: "red",
                                    borderRadius: 100,
                                }}
                            >
                                <Ionicons
                                    name={"trash"}
                                    size={22}
                                    color="white"
                                />
                            </View>
                            <Paragraph type={"h4"}>
                                Cancelar corrida
                            </Paragraph>
                        </View> : userAlreadyRequested
                            ?
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 20,
                                }}
                            >
                                <View
                                    style={{
                                        padding: 5,
                                        backgroundColor: appTheme.color.darkBackground,
                                        borderRadius: 100,
                                    }}
                                >
                                    <Feather
                                        name={"send"}
                                        size={22}
                                        color="red"
                                    />
                                </View>
                                <Paragraph type={"h4"}>
                                    Cancelar solicitação
                                </Paragraph>
                            </View>
                            :
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 20,
                                }}
                            >
                                <View
                                    style={{
                                        padding: 5,
                                        backgroundColor: appTheme.color.darkBackground,
                                        borderRadius: 100,
                                    }}
                                >
                                    <Feather
                                        name={"send"}
                                        size={22}
                                        color="white"
                                    />
                                </View>
                                <Paragraph type={"h4"}>
                                    Solicitar corrida
                                </Paragraph>
                            </View>
                    }
                </TouchableOpacity>

            </View>
        </View>
    )
}


export default RideDetailRiderScreen;