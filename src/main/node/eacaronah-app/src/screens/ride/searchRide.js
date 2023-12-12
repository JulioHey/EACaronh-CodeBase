import {View} from "react-native";
import Header from "../../components/molecules/header";
import LabeledInput from "../../components/molecules/labeledInput";
import ElevatedButton from "../../components/atoms/elevatedButton";
import PageContainer from "../../containers/pageContainer";
import {useContext, useState} from "react";
import IconButtonFlat from "../../components/atoms/iconButtonFlat";
import Ionicons from "react-native-vector-icons/Ionicons";
import {ThemeContext} from "../../store/context/theme";
import {AppContext} from "../../store/context/app";
import RideList from "../../components/organism/rideList";
import Paragraph from "../../components/atoms/Paragraph";
import {RideService} from "../../store/services/ride";
import {AuthContext} from "../../store/context/auth";

const SearchRideScreen = () => {
    const {appTheme} = useContext(ThemeContext);
    const {navigation} = useContext(AppContext);
    const {token} = useContext(AuthContext);

    const [toAddress, setToAddress] = useState("");
    const [date, setDate] = useState("");
    const [search, setSearch] = useState(false);

    const [rides, setRides] = useState([]);

    const searchRides = () => {
        RideService.SearchRides(token, date, toAddress).then(res => {
            setSearch(true)
            if (res.status === 200) {
                setRides(res.data.rides)
            }
        })
    }


    return (<PageContainer
        >
            <View
                style={{
                    paddingHorizontal: 20,
                    gap: 20,
                }}
            >
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
                    pageTitle="Buscar carona"
                />
                <LabeledInput
                    title={"Destino"}
                    value={toAddress}
                    onChange={(e) => setToAddress(e.target.value)}
                />
                <LabeledInput
                    title={"Data"}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <ElevatedButton
                    title={"Buscar"}
                    onClick={searchRides}
                />
                {search ?
                    <>
                        <Paragraph
                            type={"h3"}
                        >Caronas encontradas</Paragraph>
                        <RideList rides={rides}/>
                    </>
                     : null}
            </View>

        </PageContainer>
    )
}

export default SearchRideScreen;