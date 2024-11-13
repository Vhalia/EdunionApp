import { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native"
import MainText from "../../../../modules/text/MainText";
import { ColorConstants } from "../../../../constants/ThemeConstants";
import PhotoUploader from "../../../../components/photoUploader/PhotoUploader";
import MainButton from "../../../../modules/mainButton/MainButton";
import Toast from "react-native-toast-message";
import Context from "../../../../contexts/AuthContext/AuthContext";
import useSchoolProofService from "../../../../hooks/useSchoolProofService";
import Proof from "../../../../models/Proof";
import File from "../../../../models/File";
import EUserState from "../../../../models/enums/EUserState";

const SchoolProofSetting = () => {
    const [schoolProof, setSchoolProof] = useState<File>();
    const [schoolProofs, setSchoolProofs] = useState<Proof[]>([]);
    const [sendProofIsLoading, setSendProofLoading] = useState(false)
    const [schoolProofIsLoading, setSchoolProofLoading] = useState(false)
    
    const authContext = useContext(Context);
    const schoolProofService = useSchoolProofService();

    useEffect(() => {
        setSchoolProofLoading(true)

        schoolProofService.getOwn().then((sp) => {
            setSchoolProofs([...sp])
            setSchoolProofLoading(false)
        }).catch(err => {
            setSchoolProofLoading(false)
            console.log(err)
        })
    }, [])

    const onSend = async () => {
        if (schoolProof === undefined) {
            Toast.show({
                type: "error",
                text1: "Veuillez ajouter une photo"
            })

            return;
        }

        setSendProofLoading(true)

        try{
            await schoolProofService.postSchoolProof(
                authContext!.currentUser!.school?.id,
                schoolProof)

            setSendProofLoading(false)

            Toast.show({
                type: "success",
                text1: "Preuve envoyée avec succès"
            })

        }catch(err) {
            console.log(err)
            setSendProofLoading(false)
        }
    }

    const renderActive = () => {
        return (
            <View style={styles.container}>
                <MainText
                    text="Votre preuve a été approuvée !"
                    fontSize={16}
                    fontColor={ColorConstants.whiteMainColor}
                    style={{marginTop: 10}}/>
                <MainText
                    text="Vous pouvez pleinement utiliser l'application."
                    fontSize={14}
                    fontColor={ColorConstants.white70PercentColor}/>
                <PhotoUploader
                    maxPhoto={1}
                    OnAddPhoto={setSchoolProof}
                    photos={schoolProofs.map((proof) => {return {uri: proof.path} as File})}
                    isLoading={schoolProofIsLoading}/>
            </View>
        )
    }

    const renderPending = () => {
        return (
            <View style={styles.container}>
                <MainText
                    text="Nous sommes entrain de vérifier votre preuve de scolarité."    
                    fontSize={16}
                    fontColor={ColorConstants.whiteMainColor}
                    style={{marginTop: 10}}/>
                <MainText
                    text="Ajoutez une photo qui prouve que vous étudiez dans cette école (Journale de classe nommé, carte étudiante, ...)"
                    fontSize={14}
                    fontColor={ColorConstants.white70PercentColor}/>
                <PhotoUploader
                    maxPhoto={1}
                    OnAddPhoto={setSchoolProof}
                    photos={schoolProofs.map((proof) => {return {uri: proof.path} as File})}
                    isLoading={schoolProofIsLoading}/>
                <MainButton
                    text="Modifier"
                    onPress={onSend}
                    isLoading={sendProofIsLoading}
                    style={styles.button}/>
            </View>
        )
    }

    const renderInactive = () => {
        return (
            <View style={styles.container}>
                <MainText
                    text="Veuillez ajouter une preuve"
                    fontSize={16}
                    fontColor={ColorConstants.whiteMainColor}
                    style={{marginTop: 10}}/>
                <MainText
                    text="Ajoutez une photo qui prouve que vous étudiez dans cette école (Journale de classe nommé, carte étudiante, ...)"
                    fontSize={14}
                    fontColor={ColorConstants.white70PercentColor}/>
                <PhotoUploader
                    maxPhoto={1}
                    OnAddPhoto={setSchoolProof}
                    photos={schoolProofs.map((proof) => {return {uri: proof.path} as File})}
                    isLoading={schoolProofIsLoading}/>
                <MainButton
                    text="Envoyer"
                    onPress={onSend}
                    isLoading={sendProofIsLoading}
                    style={styles.button}/>
            </View>
        )
    }

    const render = () => {
        switch(authContext?.currentUser?.state){
            case EUserState.ACTIVE:
                return renderActive()
            case EUserState.PENDING:
                return renderPending()
            case EUserState.INACTIVE:
                return renderInactive()
        }
    }
    
    return (
        render()
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        gap: 10,
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: ColorConstants.purpleMainColor,
        padding: 10,
        width: 350,
        marginTop: 50
    },
})

export default SchoolProofSetting;