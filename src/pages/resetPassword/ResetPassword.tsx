import { StyleSheet, View } from "react-native"
import { ColorConstants } from "../../constants/ThemeConstants"
import { useState } from "react"
import MultiStepForm, { Step } from "../../components/multiStepForm/MultiStepForm"
import MainInput from "../../components/mainInput/MainInput"
import MainText from "../../modules/text/MainText"
import { useNavigation } from "@react-navigation/native"
import Toast from "react-native-toast-message"
import Constants from "../../constants/Constants"

const ResetPassword = (props: ResetPasswordProps) => {
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [code, setCode] = useState<string>("")
    const [email, setEmail] = useState<string>("")

    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string|undefined>(undefined)
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState<string|undefined>(undefined)
    const [codeErrorMessage, setCodeErrorMessage] = useState<string|undefined>(undefined)
    const [emailErrorMessage, setEmailErrorMessage] = useState<string|undefined>(undefined)

    const navigation = useNavigation<any>();

    const onSubmit = () => {
        navigation.navigate('Login')
    }

    const renderSecurity = () => {
        return (
            <View style={styles.inputContainer}> 
                <MainInput
                    containerStyle={styles.input}
                    placeholderColor={ColorConstants.white70PercentColor}
                    placeholder="Code"
                    onChange={setCode}
                    isOnError={codeErrorMessage !== undefined}
                    errorMessage={codeErrorMessage} />
            </View>
        )
    }
    
    const canGoNextSecurity = () => {
        setCodeErrorMessage(undefined)

        let canGoNext = true
        if (code === "") {
            setCodeErrorMessage("Veuillez renseigner le code")
            canGoNext = false
        }

        return canGoNext;
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
                    autoCapitalize="none"/>
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
                    placeholder="Nouveau mot de passe"
                    onChange={setPassword}
                    isOnError={passwordErrorMessage !== undefined}
                    errorMessage={passwordErrorMessage}
                    isSecret
                    autoCapitalize="none"/>
                <MainInput
                    containerStyle={styles.input}
                    placeholderColor={ColorConstants.white70PercentColor}
                    placeholder="Confirmez le nouveau mot de passe"
                    onChange={setConfirmPassword}
                    isOnError={confirmPasswordErrorMessage !== undefined}
                    errorMessage={confirmPasswordErrorMessage}
                    isSecret
                    autoCapitalize="none"/>
            </View>
        )
    }

    const canGoNextResetPassword = () => {
        setPasswordErrorMessage(undefined)
        setConfirmPasswordErrorMessage(undefined)

        if (password === "") {
            setPasswordErrorMessage("Veuillez renseigner le nouveau mot de passe")
            return false
        }

        if (confirmPassword === "") {
            setConfirmPasswordErrorMessage("Veuillez confirmer le nouveau mot de passe")
            return false
        }

        if (password !== confirmPassword) {
            setConfirmPasswordErrorMessage("Les mots de passe ne sont pas identiques")
            return false;
        }

        return true;
    }

    const onNext = (step: number) => {
        if (step == 0) {
            Toast.show({
                type: "success",
                text1: "Code envoyé"
            })
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
            name: "Code",
            renderContent: () => renderSecurity(),
            canGoNext: () => canGoNextSecurity()
        },
        {
            index: 2,
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