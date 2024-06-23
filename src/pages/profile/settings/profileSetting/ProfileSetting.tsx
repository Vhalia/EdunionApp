import { TextInput, View } from "react-native"
import { ColorConstants } from "../../../../constants/ThemeConstants"
import { useContext, useState } from "react"
import MainText from "../../../../modules/text/MainText"
import AuthContext from "../../../../contexts/AuthContext/AuthContext"
import styles from "./style/profileSettingStyle"
import HorizontalLine from "../../../../modules/horizontalLine/HorizontalLine"
import PhotoUploader from "../../../../components/photoUploader/PhotoUploader"
import MainInput from "../../../../components/mainInput/MainInput"

const ProfileSetting = () => {
    const authContext = useContext(AuthContext)
    const currentUser = authContext?.currentUser

    const [firstname, setFirstname] = useState(currentUser?.firstName)
    const [lastname, setLastName] = useState(currentUser?.lastName)
    const [school, setSchool] = useState(currentUser?.school.name)

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
                    value={school}/>
            </View>
        </View>
    )    
}

export default ProfileSetting