import { TouchableHighlight, View } from "react-native"
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
import useStorage from "../../hooks/useStorage";
import useAuthorizationService from "../../hooks/useAuthorizationService";

const Login = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [errorMessageEmail, setErrorMessageEmail] = useState<string|undefined>(undefined)
    const [errorMessagePassword, setErrorMessagePassword] = useState<string|undefined>(undefined)

    const storage = useStorage();
    const authContext = useContext(Context);
    const navigation = useNavigation<any>();
    const authorizationService = useAuthorizationService();
    
    const onLoginPress = () => {
        setErrorMessageEmail(undefined)
        setErrorMessagePassword(undefined) 
        
        if (email === "" || password === "") {
            setErrorMessageEmail("Veuillez renseigner tous les champs")
            setErrorMessagePassword("Veuillez renseigner tous les champs")
            return;
        }else if (!Constants.emailRegex.test(email)){
            setErrorMessageEmail("Email incorrecte")
            return;
        }

        authorizationService.login(email, password)
            .then(res => {
                storage.set("token", res.accessToken)
                authContext!.setToken(res.accessToken)
                navigation.navigate('Navbar')
            })
            .catch(err => {
                if (err.status == 401) {
                    setErrorMessagePassword("L'email ou le mot de passe est incorrecte")
                    setErrorMessageEmail("L'email ou le mot de passe est incorrecte")
                }
                console.log(err)
            })
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