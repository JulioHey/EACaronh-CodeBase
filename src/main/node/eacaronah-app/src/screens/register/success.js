import {useContext, useState} from "react";
import { View } from "react-native";
import PageContainer from "../../containers/pageContainer";
import TextBox from "../../components/atoms/textBox";
import ElevatedButton from "../../components/atoms/elevatedButton";
import Header from "../../components/molecules/header";
import IconButton from "../../components/atoms/iconButton";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {ThemeContext} from "../../store/context/theme";
import {AuthContext} from "../../store/context/auth";
import LabeledInput from "../../components/molecules/labeledInput";
import Paragraph from "../../components/atoms/Paragraph";

const SuccessScreen = ({ navigation }) => {
  const {appTheme} = useContext(ThemeContext);
  const {updatePassword} = useContext(AuthContext);
  const [password, setPassword] = useState("");

  return (
    <PageContainer
        hasFooter={false}
    >
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
          paddingHorizontal: 20,
          gap: 20,
      }}>
          <Paragraph type={'h3'} styles={{
              textAlign: "center",
          }}>
              Seu cadastro foi concluído com sucesso, crie uma senha para sua conta e clique em concluir para começar a usar o aplicativo
          </Paragraph>
          <LabeledInput
          title={"Digite sua nova senha"}
            value={password}
              onChange={(e) => setPassword(e.target.value)}
          />
      <View style={{
        alignItems: "center",
        justifyContent: "center",
        marginVertical: "25vh",
        width: "50vw"
      }}>
        <ElevatedButton
          title={"Concluir"}
          color={appTheme.color.darkBackground}
          onClick={ () => updatePassword({password}) } />
      </View>
      </View>
    </PageContainer>
  )


}

export default SuccessScreen;
