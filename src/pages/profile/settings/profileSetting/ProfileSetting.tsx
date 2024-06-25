import { TextInput, View } from "react-native"
import { ColorConstants } from "../../../../constants/ThemeConstants"
import { useContext, useEffect, useState } from "react"
import MainText from "../../../../modules/text/MainText"
import AuthContext from "../../../../contexts/AuthContext/AuthContext"
import styles from "./style/profileSettingStyle"
import HorizontalLine from "../../../../modules/horizontalLine/HorizontalLine"
import PhotoUploader from "../../../../components/photoUploader/PhotoUploader"
import MainInput from "../../../../components/mainInput/MainInput"
import School from "../../../../models/School"
import useSchoolService from "../../../../hooks/useSchoolService"

const ProfileSetting = () => {
    const authContext = useContext(AuthContext)
    const currentUser = authContext?.currentUser

    const [firstname, setFirstname] = useState(currentUser?.firstName)
    const [lastname, setLastName] = useState(currentUser?.lastName)
    const [school, setSchool] = useState<School>()
    const [isLoading, setIsLoading] = useState(false)

    const schoolService = useSchoolService()

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

    const onFirstnameChange = () => {
        
    }

    const onLastnameChange = () => {
        
    }


    return (
        <View>
            <PhotoUploader
                maxPhoto={1}
                photos={currentUser?.picturePath ? [currentUser?.picturePath!] : []}
                style={{width: 163, padding: 1, backgroundColor: ColorConstants.blackMainColor}}
                photoStyle={styles.photo}/>
            <View style={styles.bigGap}>
                <MainText
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
        </View>
    )    
}

export default ProfileSetting