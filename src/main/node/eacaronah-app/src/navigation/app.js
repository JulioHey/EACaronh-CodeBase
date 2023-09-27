import React, {useContext} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import {AuthContext} from "../store/context/auth";

import Home from "../screens/home";
import LoginScreen from "../screens/auth/login";
import UserRegister from "../screens/auth/register";
import InstitutionRegister from "../screens/auth/institutionRegister";
import {RegisterProvider} from "../store/context/registerContext";


const Stack = createNativeStackNavigator();

export const AppNavigation = () => {
    const {isLoggedIn} = useContext(AuthContext);

    return (
        <NavigationContainer>
            {!isLoggedIn ? (
                <Stack.Navigator
                    initialRouteName="userRegister"
                    screenOptions={{
                    headerShown: false,

                }}>
                    <Stack.Screen name="login" component={LoginScreen}/>
                    <Stack.Screen name="userRegister" component={UserRegister}/>
                    <Stack.Screen name="institutionRegister" component={InstitutionRegister}/>
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
