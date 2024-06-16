import { View } from "react-native";
import RegisterProps from "./props/RegisterProps";
import styles from "./style/RegisterStyle";
import MultiStepForm, { Step } from "../../components/multiStepForm/MultiStepForm";
import MainText from "../../modules/text/MainText";
import MainInput from "../../components/mainInput/MainInput";
import { ColorConstants } from "../../constants/ThemeConstants";
import PhotoUploader from "../../components/photoUploader/PhotoUploader";
import { useEffect, useState } from "react";
import {Picker} from "@react-native-picker/picker";
import Constants from "../../constants/Constants";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

const Register = (props: RegisterProps) => {
    const [schools, setSchools] = useState<string[]>([]);
    const [firstname, setFirstname] = useState<string>("");
    const [lastname, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [selectedSchool, setSelectedSchool] = useState<string>("");
    const [schoolProof, setSchoolProof] = useState<string>("");

    const [firstnameErrorMessage, setFirstnameErrorMessage] = useState<string|undefined>(undefined);
    const [lastnameErrorMessage, setLastnameErrorMessage] = useState<string|undefined>(undefined);
    const [emailErrorMessage, setEmailErrorMessage] = useState<string|undefined>(undefined);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string|undefined>(undefined);
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState<string|undefined>(undefined);

    const navigation = useNavigation<any>();

    useEffect(() => {
        setSchools([
            "Assomption",
            "Saint-Joseph",
            "Saint-André",
            "Saint-Luc",
            "La Sapiniere"
        ])
    }, [])

    const onPressRegister = () => {
        navigation.navigate('ConfirmEmail')
    }
    
    const renderPersonnalInformations = () => {
        return (
            <View style={styles.inputContainer}>
                <MainInput
                    placeholder="Prénom"
                    containerStyle={styles.input}
                    placeholderColor={ColorConstants.white70PercentColor}
                    onChange={setFirstname}
                    isOnError={firstnameErrorMessage != undefined}
                    errorMessage={firstnameErrorMessage}
                    autoCapitalize="words"/>
                <MainInput
                    placeholder="Nom"
                    containerStyle={styles.input}
                    placeholderColor={ColorConstants.white70PercentColor}
                    onChange={setLastName}
                    isOnError={lastnameErrorMessage != undefined}
                    errorMessage={lastnameErrorMessage}
                    autoCapitalize="words"/>
            </View>
        )
    }
    
    const renderLoginInformations = () => {
        return (
            <View style={styles.inputContainer}>
                <MainInput
                    placeholder="Email"
                    containerStyle={styles.input}
                    placeholderColor={ColorConstants.white70PercentColor}
                    onChange={setEmail}
                    isOnError={emailErrorMessage !== undefined}
                    errorMessage={emailErrorMessage}
                    autoCapitalize="none"
                    keyboardType="email-address"/>
                <MainInput
                    placeholder="Mot de passe"
                    containerStyle={styles.input}
                    placeholderColor={ColorConstants.white70PercentColor}
                    isSecret
                    onChange={setPassword}
                    isOnError={passwordErrorMessage !== undefined}
                    errorMessage={passwordErrorMessage}
                    autoCapitalize="none"/>
                <MainInput
                    placeholder="Confirmez le mot de passe"
                    containerStyle={styles.input}
                    placeholderColor={ColorConstants.white70PercentColor}
                    isSecret
                    onChange={setConfirmPassword}
                    isOnError={confirmPasswordErrorMessage !== undefined}
                    errorMessage={confirmPasswordErrorMessage}
                    autoCapitalize="none"/>
            </View>
        )
    }

    const renderSchoolProof = () => {
        return (
            <View style={styles.inputContainer}>
                <View style={styles.dropDown}>
                    <Picker
                        selectedValue={selectedSchool}
                        onValueChange={(itemValue, itemIndex) => setSelectedSchool(itemValue)}
                        style={styles.dropDown}
                        dropdownIconColor={ColorConstants.whiteMainColor}>
                        {schools.map((school, index) => (
                            <Picker.Item
                                key={index}
                                label={school}
                                value={school}/>
                        ))}
                    </Picker>
                </View>
                <PhotoUploader
                    maxPhoto={1}
                    OnAddPhoto={setSchoolProof}/>
            </View>
        )
    }

    const canGoNextPersonnalInformations = () => {
        setFirstnameErrorMessage(undefined)
        setLastnameErrorMessage(undefined)
        let canGoNext = true;

        if (firstname === ""){
            setFirstnameErrorMessage("Veuillez renseigner tous les champs")
            canGoNext = false
        }

        if (lastname === ""){
            setLastnameErrorMessage("Veuillez renseigner tous les champs")
            canGoNext = false
        }

        return canGoNext
    }
    const canGoNextLoginInformations = () => {
        setEmailErrorMessage(undefined)
        setPasswordErrorMessage(undefined)
        setConfirmPasswordErrorMessage(undefined)
        let canGoNext = true;

        if (email === ""){
            setEmailErrorMessage("Veuillez renseigner tous les champs")
            canGoNext = false
        }

        if (!Constants.emailRegex.test(email)){
            setEmailErrorMessage("Email incorrecte")
            canGoNext = false
        }

        if (password === ""){
            setPasswordErrorMessage("Veuillez renseigner tous les champs")
            canGoNext = false
        }

        if (confirmPassword === ""){
            setConfirmPasswordErrorMessage("Veuillez renseigner tous les champs")
            canGoNext = false
        }

        if (password !== confirmPassword){
            setConfirmPasswordErrorMessage("Les mots de passe ne sont pas identiques")
            canGoNext = false
        }


        return canGoNext
    }

    const canGoNextSchoolConfirmation = () => {
        if (schoolProof === undefined || schoolProof === ""){
            Toast.show({
                type: "error",
                text1: "Veuillez ajouter une photo",
                position: "top",
                visibilityTime: 3000,
                swipeable: true,
            })

            return false
        }

        return true;
    }

    const steps : Step[] = [
        {
            name: "Informations personnelles",
            index: 0,
            renderContent: () => renderPersonnalInformations(),
            canGoNext: () => canGoNextPersonnalInformations()
        },
        {
            name: "Informations de connexion",
            index: 1,
            renderContent: () => renderLoginInformations(),
            canGoNext: () => canGoNextLoginInformations()
        },
        {
            name: "Confirmation de l'école",
            index: 2,
            renderContent: () => renderSchoolProof(),
            canGoNext: () => canGoNextSchoolConfirmation()
        },
    ]
    return (
        <View style={styles.mainContainer}>
            <MultiStepForm 
                steps={steps}
                onPressSubmit={onPressRegister}/>
        </View>
    )

}

export default Register;