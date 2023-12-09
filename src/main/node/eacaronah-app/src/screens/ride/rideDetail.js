import PageContainer from "../../containers/pageContainer";
import {Dimensions, Text, View} from "react-native";
import {RideToMap} from "../../utils/ride"
import {useContext, useEffect, useState} from "react";
import {ThemeContext} from "../../store/context/theme";
import Header from "../../components/molecules/header";
import IconButtonFlat from "../../components/atoms/iconButtonFlat";
import Ionicons
    from "react-native-vector-icons/Ionicons";
import {AppContext} from "../../store/context/app";
import IconButton from "../../components/atoms/iconButton";
import MaterialCommunityIcons
    from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import DetailMap from "../../components/molecules/detailMap";

const RideDetail = ({route}) => {
    const {ride} = route.params;

    const {appTheme} = useContext(ThemeContext);
    const {navigation} = useContext(AppContext);

    const [rider, setRider] = useState(null);

    useEffect(() => {
        const res = {
            "Name": "Nome",
            "Instituição": "USP",
            "Departamento": "EACH",
            "Curso": "SI"
        }
        setRider(res)
    }, [])
    console.log(ride)
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
                pageTitle="Detalhes da carona"
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
                    <DetailMap title="Detalhes da carona"
                               ride={ride !== undefined ? RideToMap(ride) : {}}/>
                    <DetailMap title="Detalhes do motorista"
                               ride={rider != null ? rider : {}}/>
                </View>


                <IconButton
                    style={{
                        flexDirection: "row",
                        width: Dimensions.get('window').width - 2 * appTheme.spacing.l,
                        gap: 10,
                    }}
                >
                    <Text
                        style={{
                                color: "white",
                            fontSize: 20,
                        }}
                    >Solicitar Carona</Text>
                    <MaterialCommunityIcons
                        name="human-handsup"
                        size={25}
                        color="white"
                    />
                </IconButton>
            </View>


        </PageContainer>
    )
}


export default RideDetail;