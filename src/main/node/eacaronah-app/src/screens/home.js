import { View} from "react-native";
import {AuthContext} from "../store/context/auth";
import {useContext, useEffect, useState} from "react";
import Footer from "../components/molecules/footer";
import {AppContext, RIDE} from "../store/context/app";
import RideHome from "./ride/home";
import CarHome from "./car/home";
import HeaderApp from "../components/organism/headerApp";
import PageContainer from "../containers/pageContainer";

const Home = ({navigation}) => {
    const {logout} = useContext(AuthContext);
    const {isRide, setNavigation} = useContext(AppContext);

    useEffect(() => {
        setNavigation(navigation)
    }, [])
    return (
        <PageContainer hasHeader={true} >
            {isRide == RIDE ? <RideHome/> : <CarHome />}
        </PageContainer>
    )
}

export default Home;