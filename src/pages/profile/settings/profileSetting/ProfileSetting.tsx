import { Platform, ScrollView, TextInput, View } from "react-native"
import { ColorConstants } from "../../../../constants/ThemeConstants"
import React, { useContext, useEffect, useState } from "react"
import MainText from "../../../../modules/text/MainText"
import AuthContext from "../../../../contexts/AuthContext/AuthContext"
import styles from "./style/profileSettingStyle"
import HorizontalLine from "../../../../modules/horizontalLine/HorizontalLine"
import PhotoUploader from "../../../../components/photoUploader/PhotoUploader"
import MainInput from "../../../../components/mainInput/MainInput"
import School from "../../../../models/School"
import useSchoolService from "../../../../hooks/useSchoolService"
import MainButton from "../../../../modules/mainButton/MainButton"
import useUserService from "../../../../hooks/useUserService"
import Toast from "react-native-toast-message"
import File from "../../../../models/File"
import { Picker } from "@react-native-picker/picker"
import usePaymentService from "../../../../hooks/usePaymentService"

const ProfileSetting = () => {
    const authContext = useContext(AuthContext)
    const currentUser = authContext?.currentUser
    console.log(currentUser)

    const [firstname, setFirstname] = useState(currentUser?.firstName)
    const [lastname, setLastName] = useState(currentUser?.lastName)
    const [description, setDescription] = useState(currentUser?.description)
    const [schoolYear, setSchoolYear] = useState(currentUser?.schoolYear)
    const [school, setSchool] = useState<School>()
    const [profilePicture, setProfilePicture] = useState<File|undefined>(
        currentUser?.picturePath ? {uri: currentUser?.picturePath} as File : undefined)
    const [isLoading, setIsLoading] = useState(false)
    const [iban, setIban] = useState(currentUser?.paymentInformation?.iban ?? "")
    const [ibanErrorMessage, setIbanErrorMessage] = useState<string|undefined>(undefined)

    const schoolService = useSchoolService()
    const userService = useUserService();
    const paymentService = usePaymentService()

    const ibanRegex = /^[A-Z]{2}(?:[ ]?[0-9]){14}$/;

    useEffect(() => {
        setIsLoading(true)
        
        schoolService.getById(currentUser!.school?.id).then((schoolRes) => {
            setSchool(schoolRes)
            setIsLoading(false)

        }).catch(err => {
            setIsLoading(false)
            console.log(err)
        })
    }, [])

    const onSubmit = async () => {
        setIsLoading(true)
        setIbanErrorMessage(undefined)

        try {
            await userService.update({
                description: description ?? "",
                firstName: firstname ?? "",
                lastName: lastname ?? "",
                schoolYear: schoolYear ?? 1,
            })

            if (profilePicture?.uri != currentUser?.picturePath){
                if (!profilePicture
                    || (profilePicture && profilePicture.uri != currentUser?.picturePath)) {
                    
                    await userService.updateProfilePicture(profilePicture!)
                }
            }

            if (iban && currentUser?.paymentInformation?.iban != iban && ibanRegex.test(iban)) {
                if (currentUser?.paymentInformation?.iban)
                    await paymentService.updateIban(iban)
                else
                    await paymentService.postIban(iban)
            }else{
                setIbanErrorMessage("IBAN invalide. Veuillez utiliser ce format: BE12 1234 1234 1234")
                setIsLoading(false)
                return
            }
            
            Toast.show({
                type: "success",
                text1: "Profile mis à jour"
            })

            var updatedUser = await userService.get()
            console.log(updatedUser)
            authContext!.setCurrentUser(updatedUser)

            setIsLoading(false)
        }catch (err) {
            setIsLoading(false)
            console.log(err)
        }
    }

    const onFirstnameChange = (value: string) => {
        setFirstname(value)
    }

    const onLastnameChange = (value: string) => {
        setLastName(value)
    }

    const onDescriptionChange = (value: string) => {
        setDescription(value)
    }

    const onSchoolYearChange = (value: string) => {
        setSchoolYear(Number.parseInt(value))
    }

    const onIbanChange = (value: string) => {
        if (value.length >= 19){
            setIban(value.substring(0, 19))
            return
        }

        let result = value.replaceAll(" ", "")

        setIban(result.replace(/(.{4})/g, "$1 "))
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            overScrollMode="never">
            <PhotoUploader
                maxPhoto={1}
                photos={profilePicture ? [profilePicture] : []}
                style={{width: 163, padding: 1, backgroundColor: ColorConstants.blackMainColor}}
                photoStyle={styles.photo}
                OnAddPhoto={(value) => setProfilePicture(value)}
                OnDeletePhoto={(_) => setProfilePicture(undefined)}/>
            <View style={styles.bigGap}>
                <MainText
                    style={styles.title}
                    weight={'700'}
                    fontSize={15}
                    text="Prénom"/>
                <MainInput
                    style={[styles.inputs, styles.gap]}
                    inputMode="text"
                    onChange={onFirstnameChange}
                    value={firstname}/>
            </View>
            <View style={styles.bigGap}>
                <MainText
                    style={styles.title}
                    weight={'700'}
                    fontSize={15}
                    text="Nom de famille"/>
                <MainInput
                    style={[styles.inputs, styles.gap]}
                    inputMode="text"
                    onChange={onLastnameChange}
                    value={lastname}/>
            </View>
            <View style={styles.bigGap}>
                <MainText
                    style={styles.title}
                    weight={'700'}
                    fontSize={15}
                    text="Bio"/>
                <MainInput
                    style={[styles.inputs, styles.gap]}
                    inputMode="text"
                    onChange={onDescriptionChange}
                    value={description}
                    multiline
                    numberOfLines={3}/>
            </View>
            <View style={styles.bigGap}>
                <MainText
                    style={styles.title}
                    weight={'700'}
                    fontSize={15}
                    text="Année scolaire"/>
                
                <View style={[Platform.OS == "ios" ? {width: 80} :styles.dropDown, styles.gap]}>
                    <Picker
                        selectedValue={schoolYear}
                        onValueChange={(itemValue, itemIndex) => onSchoolYearChange(itemValue.toString())}
                        style={Platform.OS == "ios" ? {} : styles.dropDown}
                        dropdownIconColor={ColorConstants.whiteMainColor}
                        itemStyle={{color: ColorConstants.whiteMainColor}}>
                        {[1, 2, 3, 4, 5, 6].map((year, index) => (
                            <Picker.Item
                                key={index}
                                label={year.toString()}
                                value={year}/>
                        ))}
                    </Picker>
                </View>
            </View>
            <View style={styles.bigGap}>
                <MainText
                    style={styles.title}
                    weight={'700'}
                    fontSize={15}
                    text="IBAN"/>
                <MainInput
                    style={[styles.inputs, styles.gap]}
                    inputMode="text"
                    autoCapitalize="characters"
                    onChange={onIbanChange}
                    value={iban}
                    errorMessage={ibanErrorMessage}
                    isOnError={ibanErrorMessage !== undefined}
                    placeholder="BE12 1234 1234 1234"
                    placeholderColor={ColorConstants.white70PercentColor}/>
            </View>
            <View style={[styles.bigGap, {marginBottom: 20}]}>
                <MainText
                    style={styles.title}
                    weight={'700'}
                    fontSize={15}
                    text={"Ecole" + (school?.name ? `: ${school?.name}` : "")}/>
            </View>
            <MainButton
                onPress={onSubmit}
                text="Enregistrer"
                isLoading={isLoading}
                style={styles.button}/>
        </ScrollView>
    )    
}

export default ProfileSetting