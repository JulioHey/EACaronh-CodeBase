import React, {useContext} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import {AuthContext} from "../store/context/auth";

import Home from "../screens/home";
import LoginScreen from "../screens/auth/login";
import {AppProvider} from "../store/context/app";
import RideRequestDetail from "../screens/ride/rideRequestDetail";
import RegisterCarScreen from "../screens/car/register";
import RegisterRideScreen from "../screens/ride/register";
import RideDetailRiderScreen from "../screens/ride/rideDetail";
import ChatScreen from "../screens/chat/chat";
import SearchRideScreen from "../screens/ride/searchRide";
import UserRegister from "../screens/register/register";
import Otp from "../screens/register/otp";
import InstitutionRegister from "../screens/register/institutionRegister";
import SuccessScreen from "../screens/register/success";


const Stack = createNativeStackNavigator();

export const AppNavigation = () => {
    const {isLoggedIn} = useContext(AuthContext);

    return (
        <AppProvider>
            <NavigationContainer>
                {!isLoggedIn ? (
                    <Stack.Navigator
                        initialRouteName="login"
                        screenOptions={{
                            headerShown: false,

                        }}>
                        <Stack.Screen name="login" component={LoginScreen}/>
                        <Stack.Screen name="userRegister"
                                      component={UserRegister}/>
                        <Stack.Screen name="otp"
                                      component={Otp}/>
                        <Stack.Screen name="institutionRegister" component={InstitutionRegister}/>
                        <Stack.Screen name="success" component={SuccessScreen}/>
                    </Stack.Navigator>
                ) : (
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false
                        }}>
                        <Stack.Screen name="home" component={Home}/>
                        <Stack.Screen name="rideDetailRider"
                                      component={RideDetailRiderScreen}/>
                        <Stack.Screen name="rideRequestDetail"
                                      component={RideRequestDetail}/>
                        <Stack.Screen name="registerCar"
                                      component={RegisterCarScreen}/>
                        <Stack.Screen name="registerRide"
                                      component={RegisterRideScreen}/>
                        <Stack.Screen name="chat" component={ChatScreen}/>
                        <Stack.Screen name="searchRide" component={SearchRideScreen}/>
                    </Stack.Navigator>

                )}

            </NavigationContainer>
        </AppProvider>
    )
}
