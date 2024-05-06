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

    const [firstname, setFirstname] = useState(currentUser?.name)
    const [lastname, setLastName] = useState(currentUser?.lastname)
    const [school, setSchool] = useState(currentUser?.School.name)

    const onFirstnameChange = () => {
        
    }

    const onLastnameChange = () => {
        
    }


    return (
        <View>
            <PhotoUploader
                maxPhoto={1}
                photos={currentUser?.picture ? [currentUser?.picture!] : []}
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
                    onChangeText={onFirstnameChange}
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
                    onChangeText={onLastnameChange}
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