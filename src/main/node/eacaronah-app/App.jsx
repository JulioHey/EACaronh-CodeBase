import React from 'react';
import {AppNavigation} from "./src/navigation/app";
import {AuthProvider} from "./src/store/context/auth";
import {RegisterProvider} from "./src/store/context/registerContext";

export default function App() {

    return (
        <AuthProvider>
            <RegisterProvider>
                <AppNavigation/>
            </RegisterProvider>
        </AuthProvider>
    );
}
