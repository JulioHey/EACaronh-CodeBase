import React from 'react';
import {AppNavigation} from "./src/navigation/app";
import {AuthProvider} from "./src/store/context/auth";
import {MyThemeProvider} from "./src/store/context/theme";

export default function App() {

    return (
        <AuthProvider>
            <MyThemeProvider>
                <AppNavigation/>
            </MyThemeProvider>
        </AuthProvider>
    );
}
