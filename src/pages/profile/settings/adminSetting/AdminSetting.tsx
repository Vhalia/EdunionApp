import { useCallback, useContext, useEffect, useState } from "react"
import { Alert, FlatList, Image, Modal, ScrollView, StyleSheet, TouchableHighlight, TouchableOpacity, View } from "react-native"
import MainText from "../../../../modules/text/MainText";
import useUserService from "../../../../hooks/useUserService";
import { useFocusEffect } from "@react-navigation/native";
import User from "../../../../models/User";
import Toast from "react-native-toast-message";
import UserWithPicture from "../../../../components/userWithPicture/UserWithPicture";
import MainButton from "../../../../modules/mainButton/MainButton";
import { ColorConstants } from "../../../../constants/ThemeConstants";
import EUserState, { UserStateToColor, UserStateToString } from "../../../../models/enums/EUserState";
import EllipseFilledSVG from "../../../../../images/ellipseFilled.svg"
import useSchoolProofService from "../../../../hooks/useSchoolProofService";
import SchoolProof from "../../../../models/SchoolProof";
import dayjs from "dayjs";
import Loading from "../../../../modules/Loading/Loading";
import Context from "../../../../contexts/AuthContext/AuthContext";

const AdminSetting = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [bannedUsers, setBannedUsers] = useState<User[]>([]);
    const [activeUsers, setActiveUsers] = useState<User[]>([]);
    const [pendingUsers, setPendingUsers] = useState<User[]>([]);
    const [inactiveUsers, setInactiveUsers] = useState<User[]>([]);
    const [schoolProofs, setSchoolProofs] = useState<SchoolProof[]>([]);
    const [reload, setReload] = useState(true)

    const userService = useUserService();
    const schoolProofService = useSchoolProofService();
    const authContext = useContext(Context)

    useFocusEffect(
        useCallback(() => {
            if (!reload)
                return;

            setIsLoading(true)
            userService.getAll()
                .then(users => {
                    users = users.filter(user => user.id != authContext?.currentUser?.id)
                    setBannedUsers([...users.filter(user => user.state === EUserState.BANNED)])
                    setActiveUsers([...users.filter(user => user.state === EUserState.ACTIVE)])
                    setPendingUsers([...users.filter(user => user.state === EUserState.PENDING)])
                    setInactiveUsers([...users.filter(user => user.state === EUserState.INACTIVE)])

                    schoolProofService.getAll()
                        .then(sc => {
                            setSchoolProofs([...sc])
                            setIsLoading(false)
                        })
                        .catch(err => {
                            console.log(err)
                            setIsLoading(false)
                        })

                    setIsLoading(false)
                    setReload(false)
                })
                .catch(err =>{
                    console.log(err)
                    setIsLoading(false)
                })
        }, [reload])
    )

    const onPressBan = (user: User) => {
        userService.ban(user.id).then(() => {
            Toast.show({
                type: "success",
                text1: "Utilisateur banni"
            })
            setReload(true)
        }).catch(err => {
            console.log(err)
        })
    }

    const onPressUnban = (user: User) => {
        userService.unban(user.id).then(() => {
            Toast.show({
                type: "success",
                text1: "Utilisateur débanni"
            })
            setReload(true)
        }).catch(err => {
            console.log(err)
        })
    }

    const onPressValidateSchoolProof = (schoolProof: SchoolProof) => {
        schoolProofService.verify({
            userId: schoolProof.user.id,
            schoolId: schoolProof.school.id.toString(),
            schoolProofId: schoolProof.id,
            isValid: true
        })
        .then(() => {
            setReload(true)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const onPressRefuseSchoolProof = (schoolProof: SchoolProof) => {
        schoolProofService.verify({
            userId: schoolProof.user.id,
            schoolId: schoolProof.school.id.toString(),
            schoolProofId: schoolProof.id,
            isValid: false
        })
        .then(() => {
            setReload(true)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <ScrollView
            style={style.mainContainer}
            overScrollMode="never"
            showsVerticalScrollIndicator={false}>
            {isLoading
            ? <Loading />
            : 
                <>
                <View style={style.bigGap}>
                    <MainText
                        text="Utilisateurs en attentes de validation"
                        fontSize={20}
                        weight="bold"/>
                    <UserList
                        users={pendingUsers}
                        schoolProofs={schoolProofs}
                        onPressBan={onPressBan}
                        onPressUnban={onPressUnban}
                        state={EUserState.PENDING}
                        onPressRefuseSchoolProof={onPressRefuseSchoolProof}
                        onPressValidateSchoolProof={onPressValidateSchoolProof}/>
                </View>

                <View style={style.bigGap}>
                    <MainText
                        text="Utilisateurs inactifs"
                        fontSize={20}
                        weight="bold"/>
                    <UserList
                        users={inactiveUsers}
                        onPressBan={onPressBan}
                        onPressUnban={onPressUnban}
                        state={EUserState.INACTIVE}/>
                </View>

                <View style={style.bigGap}>
                    <MainText
                        text="Utilisateurs actifs"
                        fontSize={20}
                        weight="bold"/>
                    <UserList
                        users={activeUsers}
                        onPressBan={onPressBan}
                        onPressUnban={onPressUnban}
                        state={EUserState.ACTIVE}/>
                </View>

                <View style={style.bigGap}>
                    <MainText
                        text="Utilisateurs bannis"
                        fontSize={20}
                        weight="bold"/>
                    <UserList
                        users={bannedUsers}
                        onPressBan={onPressBan}
                        onPressUnban={onPressUnban}
                        state={EUserState.BANNED}/>
                </View>
                </>
            }
        </ScrollView>
    )
}

const UserList = (props: UserListProps) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState<User>();
    const [currentSchoolProof, setCurrentSchoolProof] = useState<SchoolProof>();
    const [isImageLoading, setImageIsLoading] = useState(false)

    const onShowBanUserConfirm = (user: User) => {
        Alert.alert(
            "Confirmez que vous voulez bannir cet utilisateur",
            undefined,
            [
                {
                    text: "Annuler",
                    style: "cancel"
                },
                {
                    text: "Confirmer",
                    onPress: () => props.onPressBan(user)
                }
            ]
        )

        setModalVisible(false)
    }
    
    const onShowUnbanUserConfirm = (user: User) => {
        Alert.alert(
            "Confirmez que vous voulez débannir cet utilisateur",
            undefined,
            [
                {
                    text: "Annuler",
                    style: "cancel"
                },
                {
                    text: "Confirmer",
                    onPress: () => props.onPressUnban(user)
                }
            ]
        )

        setModalVisible(false)
    }

    const onShowValidateSchoolProofConfirm = (schoolProof: SchoolProof) => {
        if (!props.onPressValidateSchoolProof)
            return;

        Alert.alert(
            "Confirmez que vous voulez valider la preuve de scolarité de cet utilisateur",
            undefined,
            [
                {
                    text: "Annuler",
                    style: "cancel"
                },
                {
                    text: "Confirmer",
                    onPress: () => props.onPressValidateSchoolProof!(schoolProof)
                }
            ]
        )

        setModalVisible(false)
    }

    const onShowRefuseSchoolProofConfirm = (schoolProof: SchoolProof) => {
        if (!props.onPressRefuseSchoolProof)
            return;

        Alert.alert(
            "Confirmez que vous voulez rejeter la preuve de scolarité de cet utilisateur",
            undefined,
            [
                {
                    text: "Annuler",
                    style: "cancel"
                },
                {
                    text: "Confirmer",
                    onPress: () => props.onPressRefuseSchoolProof!(schoolProof)
                }
            ]
        )
        setModalVisible(false)
    }

    const onPressUser = (user: User, schoolProof?: SchoolProof) => {
        setCurrentUser(user)
        setCurrentSchoolProof(schoolProof)
        setModalVisible(true)
    }

    return (
        <>
        {(props.users && props.users.length > 0)
        ?
            props.users.map((user, index) => {
                const schoolProof = props.schoolProofs?.find(s => s.user.id == user.id)

                return (
                    <TouchableHighlight
                        style={style.userContainer}
                        key={index}
                        onPress={() => onPressUser(user, schoolProof)}>
                        <>
                        <UserWithPicture
                            userName={user.firstName + " " + user.lastName}
                            picture={user.picturePath}
                            userNameFontSize={14}
                            pictureSize={40}/>
                        {props.state == EUserState.PENDING &&
                                <MainText
                                    fontSize={12}
                                    text={dayjs(schoolProof?.lastModificationDate).format("DD/MM/YYYY")}/>
                        }
                        <View style={[{justifyContent: 'center', alignItems: 'flex-end', gap:1}]}>
                            <EllipseFilledSVG color={UserStateToColor(user.state)} width={20} height={20} />
                            <MainText text={UserStateToString(user.state)} fontSize={11} fontColor={ColorConstants.white70PercentColor}/>
                        </View>
                        </>
                    </TouchableHighlight>
                )
            })
        : 
            <MainText
                text="Aucun utilisateur"
                fontSize={20}
                style={{padding: 20}}
            />}

        <Modal
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
            transparent
            animationType="fade">

            <View style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity
                    style={{...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
                    onPress={() => setModalVisible(false)}
                    activeOpacity={1}/>

                <View style={{backgroundColor: ColorConstants.greyMainColor, borderRadius: 8, padding: 15, width: 300}}>
                    <View>
                        <MainText
                            text="Informations de l'utilisateur"
                            fontSize={20}
                            weight="bold"/>
                        <View style={style.midGap}>
                            <View style={{display: 'flex', flexDirection: 'row', gap: 5}}>
                                <MainText
                                    text={"Nom et prénom:"}
                                    fontSize={16}/>
                                <MainText
                                    text={currentUser?.firstName + " " + currentUser?.lastName}
                                    fontSize={16}
                                    weight="bold"/>
                            </View>
                            <View style={{display: 'flex', flexDirection: 'row', gap: 5}}>
                                <MainText
                                    text={"Email:"}
                                    fontSize={16}/>
                                <MainText
                                    text={currentUser?.email ?? ""}
                                    fontSize={16}
                                    weight="bold"/>
                            </View>
                            <View style={{display: 'flex', flexDirection: 'row', gap: 5}}>
                                <MainText
                                    text={"Ecole:"}
                                    fontSize={16}/>
                                <MainText
                                    text={currentUser?.school?.name ?? ""}
                                    fontSize={16}
                                    weight="bold"/>
                            </View>
                            <View style={{display: 'flex', flexDirection: 'row', gap: 5}}>
                                <MainText
                                    text={"Inscrit depuis le:"}
                                    fontSize={16}/>
                                <MainText
                                    text={dayjs(currentUser?.creationDate).format("DD/MM/YYYY") ?? ""}
                                    fontSize={16}
                                    weight="bold"/>
                            </View>
                        </View>
                    </View>
                    {(props.state == EUserState.PENDING && currentSchoolProof?.proof?.path) && (
                        <View style={style.bigGap}>
                            <MainText
                                text="Preuve de scolarité"
                                fontSize={20}
                                weight="bold"/>
                            {isImageLoading ?
                                <View style={{padding: 50}}>
                                    <Loading />
                                </View>
                            :
                                <Image
                                    source={{uri: currentSchoolProof.proof.path}}
                                    style={[style.schoolProofImage, style.midGap]}
                                    resizeMode="cover"
                                    onLoadStart={() => setImageIsLoading(true)}
                                    onLoadEnd={() => setImageIsLoading(false)}/>
                            }
                                <View style={[{display: 'flex', flexDirection: 'row', gap: 10}, style.midGap]}>
                                <MainButton
                                    text="Valider"
                                    onPress={() => onShowValidateSchoolProofConfirm(currentSchoolProof!)}
                                    style={style.validateSchoolProofButton}/>
                                <MainButton
                                    text="Refuser"
                                    onPress={() => onShowRefuseSchoolProofConfirm(currentSchoolProof!)}
                                    style={style.refuseSchoolProofButton}/>
                            </View>
                        </View>
                    )}
                    <MainText
                        text="Actions sur cet utilisateur"
                        fontSize={20}
                        weight="bold"
                        style={style.bigGap}/>
                    {currentUser?.state == EUserState.BANNED
                        ? <MainButton
                            text="Débannir"
                            onPress={() => onShowUnbanUserConfirm(currentUser!)}
                            style={[style.unbanButton, style.midGap]}/>
                        : <MainButton
                            text="Bannir"
                            onPress={() => onShowBanUserConfirm(currentUser!)}
                            style={[style.banButton, style.midGap]}/>}
                </View>
            </View>
        </Modal>
        </>
    )
}

interface UserListProps {
    users: User[],
    schoolProofs?: SchoolProof[],
    state: EUserState,
    onPressBan : (user: User) => void,
    onPressUnban : (user: User) => void,
    onPressValidateSchoolProof?: (schoolProof: SchoolProof) => void,
    onPressRefuseSchoolProof?: (schoolProof: SchoolProof) => void,
}

const style = StyleSheet.create({
    mainContainer: {
    },
    usersContainer: {
        display: "flex",
    },
    userContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5
    },
    banButton : { 
        backgroundColor: ColorConstants.red
    },
    unbanButton : {
        backgroundColor: ColorConstants.blue
    },
    validateSchoolProofButton : {
        backgroundColor: ColorConstants.green,
    },
    refuseSchoolProofButton : {
        backgroundColor: ColorConstants.red70PercentColor
    },
    gap: {
        marginTop: 5
    },
    midGap: {
        marginTop: 10
    },
    bigGap: {
        marginTop: 20
    },
    schoolProofImage: {
        width: 200,
        height: 200,
    }
})

export default AdminSetting