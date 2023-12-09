import {createContext, useContext, useEffect, useState} from "react";
import theme from "../../theme/theme";
import {ThemeContext} from "./theme";
import {AuthContext} from "./auth";

export const RIDE = "RIDE"
export const CAR = "CAR"

export const AppContext = createContext({});

export const AppProvider = ({children}) => {
    const {setTheme} = useContext(ThemeContext)
    const {token} = useContext(AuthContext)

    const [ride, setRide] = useState(RIDE);
    const [cars, setCars] = useState([{}]);
    const [navigation, setNavigation] = useState({});

    useEffect(() => {
        setTheme(theme(ride))
    }, [ride])

    const onAppStart = () => {
        // fetchCars
        // fetchRides
        // fetchRidesRequest
    }

    return (
        <AppContext.Provider
            value={{cars, setCars, ride, setRide, setNavigation,navigation}}
        >
            {children}
        </AppContext.Provider>
    )

}