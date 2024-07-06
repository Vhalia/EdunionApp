import { ScrollView, TextInput, View } from "react-native"
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

const ProfileSetting = () => {
    const authContext = useContext(AuthContext)
    const currentUser = authContext?.currentUser

    const [firstname, setFirstname] = useState(currentUser?.firstName)
    const [lastname, setLastName] = useState(currentUser?.lastName)
    const [description, setDescription] = useState(currentUser?.description)
    const [schoolYear, setSchoolYear] = useState(currentUser?.schoolYear)
    const [school, setSchool] = useState<School>()
    const [profilePicture, setProfilePicture] = useState<File|undefined>(
        currentUser?.picturePath ? {uri: currentUser?.picturePath} as File : undefined)
    const [isLoading, setIsLoading] = useState(false)

    const schoolService = useSchoolService()
    const userService = useUserService();

    useEffect(() => {
        setIsLoading(true)
        
        schoolService.getById(currentUser!.schoolId).then((schoolRes) => {
            setSchool(schoolRes)
            setIsLoading(false)

        }).catch(err => {
            setIsLoading(false)
            console.log(err)
        })
    }, [])

    const onSubmit = async () => {
        setIsLoading(true)

        try {
            await userService.update({
                description: description ?? "",
                firstName: firstname ?? "",
                lastName: lastname ?? "",
                schoolYear: schoolYear ?? 1,
            })
            if (!profilePicture
                || (profilePicture && profilePicture.uri != currentUser?.picturePath)) {
                
                await userService.updateProfilePicture(profilePicture!)
            }

            
            Toast.show({
                type: "success",
                text1: "Profile mis à jour"
            })

            var updatedUser = await userService.get()
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
                <MainInput
                    style={[styles.inputs, styles.gap]}
                    inputMode="numeric"
                    onChange={onSchoolYearChange}
                    value={schoolYear?.toString()}/>
            </View>
            <View style={[styles.bigGap, {marginBottom: 20}]}>
                <MainText
                    style={styles.title}
                    weight={'700'}
                    fontSize={15}
                    text="Ecole"/>
                <MainInput
                    style={[styles.inputs, styles.gap]}
                    inputMode="text"
                    value={school?.name}
                    disabled
                    isLoading={isLoading}/>
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