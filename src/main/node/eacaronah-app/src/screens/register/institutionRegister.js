import React, {useContext} from "react";
import PageContainer from "../../containers/pageContainer";
import Header from "../../components/molecules/header";
import IconButton from "../../components/atoms/iconButton";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {View} from "react-native";
import Forms from "../../components/organism/forms";
import {RegisterContext} from "../../store/context/register";

const InstitutionRegister = ({navigation}) => {
    const {registerForm} = useContext(RegisterContext);
    return (<PageContainer>
        {registerForm.name}
        {registerForm.email}
        {registerForm.phone}
        {registerForm.birthDate}
        {registerForm.documentNumber}
    </PageContainer>);
}

export default InstitutionRegister;
