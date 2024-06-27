import { StyleSheet, View } from "react-native"
import { ColorConstants } from "../../constants/ThemeConstants"
import { useContext, useEffect, useState } from "react"
import MultiStepForm, { Step } from "../../components/multiStepForm/MultiStepForm"
import MainInput from "../../components/mainInput/MainInput"
import MainText from "../../modules/text/MainText"
import { useNavigation } from "@react-navigation/native"
import Toast from "react-native-toast-message"
import Constants from "../../constants/Constants"
import useAuthorizationService from "../../hooks/useAuthorizationService"
import useEmailService from "../../hooks/useEmailService"
import Context from "../../contexts/AuthContext/AuthContext"

const ResetPassword = (props: ResetPasswordProps) => {
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [code, setCode] = useState<string>("")
    const [email, setEmail] = useState<string>("")

    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string|undefined>(undefined)
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState<string|undefined>(undefined)
    const [codeErrorMessage, setCodeErrorMessage] = useState<string|undefined>(undefined)
    const [emailErrorMessage, setEmailErrorMessage] = useState<string|undefined>(undefined)

    const [isLoading, setIsLoading] = useState(false)

    const authorizationService = useAuthorizationService();
    const emailService = useEmailService();
    const navigation = useNavigation<any>();
    const authContext = useContext(Context);

    useEffect(() => {
        console.log("oui");
        
       if (authContext?.currentUser?.email) {
           setEmail(authContext?.currentUser.email)
       }
    }, [])

    const onSubmit = () => {
        setIsLoading(true)
        setCodeErrorMessage(undefined)

        authorizationService.resetPassword(email, password, code).then((response) => {
                setIsLoading(false)

                if (!response) {
                    setCodeErrorMessage("Code invalide")
                    return;
                }

                Toast.show({
                    type: "success",
                    text1: "Mot de passe réinitialisé",
                    text2: "Veuillez vous connecter à nouveau"
                })

                navigation.navigate('Login')
        }).catch(err => {
            setIsLoading(false)
            console.log(err)
        })
    }


    const renderEmail = () => {
       return (
            <View style={styles.inputContainer}> 
                <MainInput
                    containerStyle={styles.input}
                    placeholderColor={ColorConstants.white70PercentColor}
                    placeholder="Email"
                    onChange={setEmail}
                    isOnError={emailErrorMessage !== undefined}
                    errorMessage={emailErrorMessage}
                    autoCapitalize="none"
                    value={email}/>
            </View>
       ) 
    }

    const canGoNextEmail = () => {
        setEmailErrorMessage(undefined)

        if (email === "") {
            setEmailErrorMessage("Veuillez renseigner l'email")
            return false
        }

        if (!Constants.emailRegex.test(email)) {
            setEmailErrorMessage("Email incorrecte")
            return false
        }

        return true;
    }

    const renderResetPassword = () => {
        return (
            <View style={styles.inputContainer}>
                <MainInput
                    containerStyle={styles.input}
                    placeholderColor={ColorConstants.white70PercentColor}
                    placeholder="Code"
                    onChange={setCode}
                    isOnError={codeErrorMessage !== undefined}
                    errorMessage={codeErrorMessage} />
                <MainInput
                    containerStyle={styles.input}
                    placeholderColor={ColorConstants.white70PercentColor}
                    placeholder="Nouveau mot de passe"
                    onChange={setPassword}
                    isOnError={passwordErrorMessage !== undefined}
                    errorMessage={passwordErrorMessage}
                    isSecret
                    autoCapitalize="none"
                    disabled={code === ""}/>
                <MainInput
                    containerStyle={styles.input}
                    placeholderColor={ColorConstants.white70PercentColor}
                    placeholder="Confirmez le nouveau mot de passe"
                    onChange={setConfirmPassword}
                    isOnError={confirmPasswordErrorMessage !== undefined}
                    errorMessage={confirmPasswordErrorMessage}
                    isSecret
                    autoCapitalize="none"
                    disabled={code === "" && confirmPassword === ""}/>
            </View>
        )
    }

    const canGoNextResetPassword = () => {
        setPasswordErrorMessage(undefined)
        setConfirmPasswordErrorMessage(undefined)
        setCodeErrorMessage(undefined)

        let canGoNext = true;

        if (password === "") {
            setPasswordErrorMessage("Veuillez renseigner le nouveau mot de passe")
            canGoNext = false
        }

        if (confirmPassword === "") {
            setConfirmPasswordErrorMessage("Veuillez confirmer le nouveau mot de passe")
            canGoNext = false
        }

        if (password !== confirmPassword) {
            setConfirmPasswordErrorMessage("Les mots de passe ne sont pas identiques")
            canGoNext = false;
        }

        if (code === "") {
            setCodeErrorMessage("Veuillez renseigner le code")
            canGoNext = false
        }

        return canGoNext;
    }

    const onNext = (step: number) => {
        if (step == 0) {
            Toast.show({
                type: "success",
                text1: "Code envoyé !",
            })

            emailService.sendResetPassword(email)
            .catch(err => console.log(err))
        }
    }

    const steps : Step[] = [
        {
            index: 0,
            name: "Email",
            renderContent: () => renderEmail(),
            canGoNext: () => canGoNextEmail()
        }, 
        {
            index: 1,
            name: "Réinitialisation du mot de passe",
            renderContent: () => renderResetPassword(),
            canGoNext: () => canGoNextResetPassword()
        }
    ]

    return(
        <View style={styles.mainContainer}>
            <MultiStepForm
                steps={steps}
                onPressSubmit={onSubmit} 
                onNext={onNext}/>
        </View>
    )
}

interface ResetPasswordProps {
}

const styles = StyleSheet.create({
    mainContainer : {
        display: "flex",
        flex: 1,
        backgroundColor: ColorConstants.blackMainColor
    },
    inputContainer: {
        display: "flex",
        gap: 10,
    },
    input: {
        color: ColorConstants.whiteMainColor,
        backgroundColor: ColorConstants.blackSecondaryColor,
        width: "100%",
    },
})

export default ResetPassword