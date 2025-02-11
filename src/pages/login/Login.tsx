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
import Loading from "../../modules/Loading/Loading";
import Toast from "react-native-toast-message";
import Config from "react-native-config";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [errorMessageEmail, setErrorMessageEmail] = useState<string|undefined>(undefined)
    const [errorMessagePassword, setErrorMessagePassword] = useState<string|undefined>(undefined)
    const [isLoading, setIsLoading] = useState(false)

    const storage = useStorage();
    const authContext = useContext(Context);
    const navigation = useNavigation<any>();
    const authorizationService = useAuthorizationService();

    useEffect(() => {
        //prevent going back
        navigation.addListener('beforeRemove', (e: any) => {
            if (e.data.action.type !== 'NAVIGATE')
                e.preventDefault();
        })
    }, [navigation]);


    const onLoginPress = () => {
        setIsLoading(true)
        setErrorMessageEmail(undefined)
        setErrorMessagePassword(undefined) 
        
        if (email === "" || password === "") {
            setErrorMessageEmail("Veuillez renseigner tous les champs")
            setErrorMessagePassword("Veuillez renseigner tous les champs")
            setIsLoading(false)
            return;
        }else if (!Constants.emailRegex.test(email)){
            setErrorMessageEmail("Email incorrecte")
            setIsLoading(false)
            return;
        }

        authorizationService.login(email, password)
            .then(res => {
                storage.set("token", res.accessToken)
                authContext!.setToken(res.accessToken)
                setIsLoading(false)
                navigation.navigate('Navbar')
            })
            .catch(err => {
                setIsLoading(false)
                if (err.status == 401) {
                    setErrorMessagePassword("L'email ou le mot de passe est incorrecte")
                    setErrorMessageEmail("L'email ou le mot de passe est incorrecte")
                    setIsLoading(false)
                }else if (err.error === "Email is not verified") {
                    navigation.navigate("ConfirmEmail", {
                        email: email,
                        password: password
                    })
                    return;
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
        <SafeAreaView style={styles.mainContainer}>
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
                    style={[styles.resetPasswordButton]}>
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
                        style={styles.loginButton}
                        isLoading={isLoading}/>
                    <MainButton
                        text="S'inscrire"
                        style={styles.registerButton}
                        onPress={onPressRegister}
                        disabled={isLoading}/>
                </View>
                
            </View>
        </SafeAreaView>
    )
}

export default Login