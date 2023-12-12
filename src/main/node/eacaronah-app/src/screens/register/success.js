import {useContext} from "react";
import { View } from "react-native";
import PageContainer from "../../containers/pageContainer";
import TextBox from "../../components/atoms/textBox";
import ElevatedButton from "../../components/atoms/elevatedButton";
import Header from "../../components/molecules/header";
import IconButton from "../../components/atoms/iconButton";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {ThemeContext} from "../../store/context/theme";

const SuccessScreen = ({ navigation }) => {
  const {appTheme} = useContext(ThemeContext);

  return (
    <PageContainer>
      <Header
          heading={(
              <IconButton
                  onClick={() => navigation.navigate("institutionRegister")}
              >
                  <View style={{
                      position: "absolute",
                      left: "10px"
                  }}>
                      <MaterialIcons name="arrow-back-ios" size={30}
                                     color="white"/>
                  </View>

              </IconButton>
          )}
          pageTitle={"Cadastro"}
      />
      <View style={{
        flexDirection: "column",
        alignItems: "center",
        marginVertical: "20vh",
      }}>
      <TextBox
        text="Seu cadastro foi concluído com sucesso, clique em concluir para ser redirecionado a página de login"/>
      <View style={{
        alignItems: "center",
        justifyContent: "center",
        marginVertical: "25vh",
        width: "50vw"
      }}>
        <ElevatedButton
          title={"Concluir"}
          color={appTheme.color.darkBackground}
          onClick={ () => navigation.navigate("login") } />
      </View>
      </View>
    </PageContainer>
  )


}

export default SuccessScreen;
