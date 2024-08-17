import { StyleSheet, View } from "react-native"
import { ColorConstants } from "../../constants/ThemeConstants"
import EmailSVG from "../../../images/email.svg"
import MainText from "../../modules/text/MainText"
import MainInput from "../../components/mainInput/MainInput"
import { useContext, useState } from "react"
import MainButton from "../../modules/mainButton/MainButton"
import Toast from "react-native-toast-message"
import useEmailService from "../../hooks/useEmailService"
import { useNavigation } from "@react-navigation/native"
import useAuthorizationService from "../../hooks/useAuthorizationService"
import useStorage from "../../hooks/useStorage"
import Context from "../../contexts/AuthContext/AuthContext"

const ConfirmEmail = (props: ConfirmEmailProps) => {
    const [code, setCode] = useState<string>("")
    const [codeErrorMessage, setCodeErrorMessage] = useState<string|undefined>(undefined)
    const [submitCodeIsLoading, setSubmitCodeIsLoading] = useState(false)
    const [resendIsLoading, setResendIsLoading] = useState(false)

    const navigation = useNavigation<any>()
    const storage = useStorage();
    const authContext = useContext(Context)
    const emailService = useEmailService()
    const authorizationService = useAuthorizationService();

    const routeProps: ConfirmEmailProps = props.route.params

    const onChangeCode = (value: string) => {
        setCodeErrorMessage(undefined)

        if (value === ""){
            setCodeErrorMessage("Veuillez renseigner le code")
            return;
        }

        setCode(value)
    }

    const onPressSubmit = async () => {
        setCodeErrorMessage(undefined)
        
        if (code === ""){ 
            setCodeErrorMessage("Veuillez renseigner le code")
            return;
        }
        
        setSubmitCodeIsLoading(true)
        try {
            let success = await emailService.verify(routeProps.email!, code)

            
            if (!success){
                Toast.show({
                    type: "error",
                    text1: "Code invalide"
                })
                setSubmitCodeIsLoading(false)
                return;
            }
            
            Toast.show({
                type: "success",
                text1: "Email confirmé!"
            })
            
            
            authorizationService.login(routeProps.email!, routeProps.password!)
            .then(res => {
                    storage.set("token", res.accessToken)
                    authContext!.setToken(res.accessToken)
                    setSubmitCodeIsLoading(false)
                    navigation.navigate('Navbar')
                })
                .catch(err => {
                    setSubmitCodeIsLoading(false)
                    if (err.status == 401) {
                        Toast.show({
                            type: "error",
                            text1: "L'email ou le mot de passe est incorrecte"
                        })
                        navigation.navigate("Login")
                    }
                    console.log(err)
                })

            navigation.navigate("Navbar")
        }catch(err){ 
            console.log(err)
            setSubmitCodeIsLoading(false)
        } 
    }

    const onPressResend = async () => {
        setResendIsLoading(true)
        try {
            let success = await emailService.sendVerify(routeProps.email!)

            setResendIsLoading(false)

            if (!success){
                Toast.show({
                    type: "error",
                    text1: "Le mail n'a pas pu être renvoyé, réessayez plus tard"
                })
                return;
            }

            Toast.show({
                type: "success",
                text1: "Code renvoyé!"
            })
        }catch(err){
            console.log(err)
            setResendIsLoading(false)
        }
        
    }

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <EmailSVG
                    color={ColorConstants.whiteMainColor}
                    width={"100px"}
                    height={"100px"}
                    strokeWidth={1}/>
                <View style={styles.titleContainer}>
                    <MainText
                        text="Confirmez votre email"
                        fontSize={21}
                        weight="700"
                        fontColor={ColorConstants.whiteMainColor}/>
                    <MainText
                        text="Vérifiez votre email et confirmer le en entrant votre code"
                        fontSize={15}
                        weight="400"
                        fontColor={ColorConstants.white70PercentColor}/>
                </View>
                <MainInput
                    placeholder="Code"
                    onChange={onChangeCode}
                    style={styles.input}
                    placeholderColor={ColorConstants.white70PercentColor}
                    isOnError={codeErrorMessage !== undefined}
                    errorMessage={codeErrorMessage}/>
                <MainButton
                    onPress={onPressSubmit}
                    text="Confirmer"
                    style={styles.button}
                    isLoading={submitCodeIsLoading}/>
                <View style={{marginTop: 30}}>
                    <MainText
                        text="Vous n'avez pas recu le code?"
                        fontSize={14}
                        weight="700"
                        fontColor={ColorConstants.white70PercentColor}/>
                    <MainButton
                        onPress={onPressResend}
                        text="Renvoyer l'email"
                        fontSize={14}
                        fontColor={ColorConstants.purpleMainColor}
                        style={{backgroundColor: ColorConstants.blackMainColor}}
                        isLoading={resendIsLoading}/>
                </View>
            </View>
        </View>
    )
}

interface ConfirmEmailProps {
    email?: string,
    password?: string,
    onVerified?: () => void,
    route: any
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        backgroundColor: ColorConstants.blackMainColor,
    },
    contentContainer: {
        display: "flex",
        marginTop: 70,
        margin: 30,
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
    },
    titleContainer: {
        display: "flex",
        marginTop: 20,
        marginBottom: 10,
        gap: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        color: ColorConstants.whiteMainColor,
        backgroundColor: ColorConstants.blackSecondaryColor,
        width: "100%",
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: ColorConstants.purpleMainColor,
        padding: 10,
        width: 330,
        marginTop: 10
    },

})

export default ConfirmEmail