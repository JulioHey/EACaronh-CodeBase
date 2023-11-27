import React from 'react';
import {AppNavigation} from "./src/navigation/app";
import {AuthProvider} from "./src/store/context/auth";

export default function App() {

    return (
        <AuthProvider>
            <AppNavigation/>
        </AuthProvider>
    );
}
