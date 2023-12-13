import {View} from "react-native";
import theme from "../theme/theme";
import HeaderApp from "../components/organism/headerApp";
import {RIDE} from "../store/context/app";
import RideHome from "../screens/ride/home";
import CarHome from "../screens/car/home";
import Footer from "../components/molecules/footer";


const PageContainer = ({children, hasHeader, hasFooter = true}) => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "space-between",
                flexDirection: "column",
                display: "flex",
                backgroundColor: "white"
            }}
        >
            <View
                style={{
                    paddingBottom: 60,
                }}
            >
                {hasHeader && <HeaderApp/>}
                {children}

            </View>
            {hasFooter && <Footer/>}
        </View>
    )
}

export default PageContainer;