import {createContext, useContext, useEffect, useState} from "react";
import theme from "../../theme/theme";
import {ThemeContext} from "./theme";
import {AuthContext} from "./auth";
import {RideService} from "../services/ride";

export const RIDE = "RIDE"
export const CAR = "CAR"

export const AppContext = createContext({});

export const AppProvider = ({children}) => {
    const {setTheme} = useContext(ThemeContext)
    const {token} = useContext(AuthContext)

    const [isRide, setIsRide] = useState(RIDE);
    const [cars, setCars] = useState([]);

    const [navigation, setNavigation] = useState({});

    useEffect(() => {
        onAppStart()
    }, [token])

    useEffect(() => {
        setTheme(theme(isRide))

    }, [isRide])

    const fetchCars = async () => {
        const res = await RideService.GetCar(token)
        setCars(res.data.cars)
    }

    const onAppStart = async () => {
        if (token !== "") {
            await fetchCars()
        }
    }

    return (
        <AppContext.Provider
            value={{cars, setCars, isRide, setIsRide, setNavigation,navigation, fetchCars}}
        >
            {children}
        </AppContext.Provider>
    )

}