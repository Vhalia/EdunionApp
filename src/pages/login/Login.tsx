import { Text, TouchableHighlight, View } from "react-native"
import Context from "../../contexts/AuthContext/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import styles from "./style/LoginStyle";
import EdunionLogoSVG from "../../../images/logo.svg"
import MainInput from "../../components/mainInput/MainInput";
import { ColorConstants } from "../../constants/ThemeConstants";
import MainText from "../../modules/text/MainText";
import MainButton from "../../modules/mainButton/MainButton";
import Constants from "../../constants/Constants";

const Login = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [errorMessageEmail, setErrorMessageEmail] = useState<string|undefined>(undefined)
    const [errorMessagePassword, setErrorMessagePassword] = useState<string|undefined>(undefined)

    const authContext = useContext(Context);
    const navigation = useNavigation<any>();
    
    const onLoginPress = () => {
        setErrorMessageEmail(undefined)
        setErrorMessagePassword(undefined)


        authContext!.setCurrentUser({
            name: 'Max le Grelle ff',
            email: 'maxlegrelle@gmail.com',
            id: 1,
            lastname: 'Le Grelle',
            school: {
                id: 1,
                name: "IPL"
            }
        })
        
        if (email === "" || password === "") {
            setErrorMessageEmail("Veuillez renseigner tous les champs")
            setErrorMessagePassword("Veuillez renseigner tous les champs")
        }else if (!Constants.emailRegex.test(email)){
            setErrorMessageEmail("Email incorrecte")
        }else{
            navigation.navigate('Navbar')
        }
    }

    const onPressResetPassword = () => {
        navigation.navigate('ResetPassword')
    }

    const onPressRegister = () => {
        navigation.navigate('Register')
    }

    const onChangeEmail = (value: string) => {
        setEmail(value)
    }

    const onChangePassword = (value: string) => {
        setPassword(value)
    }


    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <EdunionLogoSVG width={200} height={200}/>
                <MainInput
                    placeholder="Email"
                    containerStyle={styles.input}
                    placeholderColor={ColorConstants.white70PercentColor}
                    onChange={onChangeEmail}
                    isOnError={errorMessageEmail !== undefined}
                    errorMessage={errorMessageEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"/>
                <MainInput
                    placeholder="Mot de passe"
                    containerStyle={styles.input}
                    placeholderColor={ColorConstants.white70PercentColor}
                    isSecret
                    onChange={onChangePassword}
                    isOnError={errorMessagePassword !== undefined}
                    errorMessage={errorMessagePassword}
                    autoCapitalize="none"/>
                <TouchableHighlight
                    onPress={onPressResetPassword}
                    underlayColor={ColorConstants.blackMainColor}
                    style={styles.resetPasswordButton}>
                    <MainText
                        text="Réinitialiser le mot de passe"
                        fontSize={13}
                        fontColor={ColorConstants.white70PercentColor}
                        style={{justifyContent: "flex-start"}}/>
                </TouchableHighlight>
                <View style={styles.buttonContainer}>
                    <MainButton
                        onPress={onLoginPress}
                        text="Connexion"
                        style={styles.loginButton}/>
                    <MainButton
                        text="S'inscrire"
                        style={styles.registerButton}
                        onPress={onPressRegister}/>
                </View>
                
            </View>
        </View>
    )
}

export default Login