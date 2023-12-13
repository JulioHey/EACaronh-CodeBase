import React from 'react';
import {AppNavigation} from "./src/navigation/app";
import {AuthProvider} from "./src/store/context/auth";
import {RegisterProvider} from "./src/store/context/register";
import {MyThemeProvider} from "./src/store/context/theme";

export default function App() {
    return (
        <AuthProvider>
            <MyThemeProvider>
                <RegisterProvider>
                    <AppNavigation/>
                </RegisterProvider>
            </MyThemeProvider>
        </AuthProvider>
    );
}
