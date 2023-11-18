import {Text, View} from "react-native";
import ElevatedButton from "../components/atoms/elevatedButton";
import LogoHeader from "../components/molecules/logoHeader";
import Footer from "../components/molecules/footer";
import PageContainer from "../containers/pageContainer";
import theme from "../theme/theme";
import {AuthContext} from "../store/context/auth";
import {useContext} from "react";

const Home = () => {
    const {logout} = useContext(AuthContext);
  return (
      <View style={{ flex: 1 }}>
        <PageContainer>
            <LogoHeader />
            <ElevatedButton title={"Logout"} color={theme.color.darkBackground} onClick={logout}/>
        </PageContainer>
        <Footer />
      </View>
    )
}

export default Home;
