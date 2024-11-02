import { Platform, ScrollView, View } from "react-native";
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
import School from "../../models/School";
import HttpClient from "../../services/httpClient/HttpClient";
import useStorage from "../../hooks/useStorage";
import useAuthorizationService from "../../hooks/useAuthorizationService";
import useSchoolService from "../../hooks/useSchoolService";
import ConfirmEmail from "../confirmEmail/ConfirmEmail";
import { AnimateStyle } from "react-native-reanimated";

const Register = (props: RegisterProps) => {
    const [firstname, setFirstname] = useState<string>("");
    const [lastname, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [schools, setSchools] = useState<School[]>([]);
    const [selectedSchoolId, setSelectedSchoolId] = useState<number|undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);

    const [firstnameErrorMessage, setFirstnameErrorMessage] = useState<string|undefined>(undefined);
    const [lastnameErrorMessage, setLastnameErrorMessage] = useState<string|undefined>(undefined);
    const [emailErrorMessage, setEmailErrorMessage] = useState<string|undefined>(undefined);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string|undefined>(undefined);
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState<string|undefined>(undefined);

    const navigation = useNavigation<any>();
    const authorizationService = useAuthorizationService();
    const schoolService = useSchoolService();
    
    useEffect(() => {
        schoolService.get()
            .then(res => {
                setSchools(res)
                setSelectedSchoolId(res[0].id)
            })
            .catch(err => console.log(err))
    }, [])

    const onPressRegister = async () => {
        setIsLoading(true)
        try {
            var registerResponse = await authorizationService.register({
                email: email,
                password: password,
                firstName: firstname,
                lastName: lastname,
                schoolId: selectedSchoolId!,
                registerToNewsletter: false
            })

            setIsLoading(false)

            if (!registerResponse) {
                Toast.show({
                    type: "error",
                    text1: "Une erreur est survenue, veuillez reessayer plus tard",
                })
                return;
            }

            navigation.navigate('ConfirmEmail', {
                email: email,
                password: password
            })
        }catch(err) {
            console.log(err)
            setIsLoading(false)
        }
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
                <MainText text="Sélectionnez votre école:" fontSize={20} style={styles.chooseSchoolTitle}/>
                <View style={Platform.OS == "ios" ? {} : styles.dropDown}>
                    <Picker
                        selectedValue={selectedSchoolId}
                        onValueChange={(itemValue, itemIndex) => setSelectedSchoolId(itemValue)}
                        style={Platform.OS == "ios" ? {} : styles.dropDown}
                        dropdownIconColor={ColorConstants.whiteMainColor}
                        itemStyle={{color: ColorConstants.whiteMainColor}}>
                        {schools.map((school, index) => (
                            <Picker.Item
                                key={index}
                                label={school.name}
                                value={school.id}/>
                        ))}
                    </Picker>
                </View>
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
    ]
    return (
        <View style={styles.mainContainer}>
            <MultiStepForm
                steps={steps}
                onPressSubmit={onPressRegister}
                isLoading={isLoading}/>
        </View>
    )

}

export default Register;