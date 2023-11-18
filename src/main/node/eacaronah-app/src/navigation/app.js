import React, {useContext} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import {AuthContext} from "../store/context/auth";

import Home from "../screens/home";
import LoginScreen from "../screens/auth/login";
import UserRegister from "../screens/auth/register";


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
