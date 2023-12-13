import {createContext, useState} from "react";
import theme from "../../theme/theme";

export const ThemeContext = createContext({})

export const MyThemeProvider = ({children}) => {
    const [appTheme, setTheme] = useState(theme())

    return (
        <ThemeContext.Provider value={{appTheme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}