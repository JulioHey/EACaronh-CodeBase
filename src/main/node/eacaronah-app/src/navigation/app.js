import React, {useContext} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import {AuthContext} from "../store/context/auth";

import Home from "../screens/home";
import LoginScreen from "../screens/auth/login";
import UserRegister from "../screens/register/register";
import OTPVerification from "../screens/register/otp";
import InstitutionRegister from "../screens/register/institutionRegister";
import SuccessScreen from "../screens/register/success";
import {RegisterProvider} from "../store/context/register";


const Stack = createNativeStackNavigator();

export const AppNavigation = () => {
    const {isLoggedIn} = useContext(AuthContext);

    return (
        <NavigationContainer>
            {!isLoggedIn ? (
                <Stack.Navigator
                    initialRouteName="login"
                    screenOptions={{
                    headerShown: false,

                }}>
                    <Stack.Screen name="login" component={LoginScreen}/>
                    <Stack.Screen name="userRegister" component={UserRegister}/>
                    <Stack.Screen name="otp" component={OTPVerification}/>
                    <Stack.Screen name="institutionRegister" component={InstitutionRegister}/>
                    <Stack.Screen name="success" component={SuccessScreen}/>
                </Stack.Navigator>
            ): (
                <Stack.Navigator screenOptions={{
                    headerShown: false
                }}>
                    <Stack.Screen name="Home" component={Home}/>
                </Stack.Navigator>
            )}

        </NavigationContainer>
    )
}
