import NavigateButton from "../../components/navigateButton/NavigateButton";
import { StyleProp, TouchableHighlight, View, ViewStyle } from "react-native";
import MainText from "../../modules/text/MainText";
import UserWithPicture from "../../components/userWithPicture/UserWithPicture";
import styles from "./style/profileStyle";
import ProfileProps from "./props/profileProps";
import { useContext, useEffect, useState } from "react";
import Context from "../../contexts/AuthContext/AuthContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LanguageSetting from "./settings/languageSetting/LanguageSetting";
import { ColorConstants } from "../../constants/ThemeConstants";
import SecuritySetting from "./settings/securitySetting/SecuritySetting";
import Header from "../../components/header/Header";
import AboutSetting from "./settings/aboutSetting/AboutSetting";
import LegalNoticeSetting from "./settings/legalNoticeSetting/LegalNoticeSetting";
import ProfileSetting from "./settings/profileSetting/ProfileSetting";
import SubPage from "../../components/subPage/SubPage";
import { useNavigation } from "@react-navigation/native";
import useStorage from "../../hooks/useStorage";
import Loading from "../../modules/Loading/Loading";
import SchoolProofSetting from "./settings/schoolProofSetting/SchoolProofSetting";
import MainButton from "../../modules/mainButton/MainButton";
import MyPostSetting from "./settings/myPostsSetting/MyPostSetting";

const Profile = (props : ProfileProps) => {
    const stack = createNativeStackNavigator();

    const headerBgStyle= {
        backgroundColor: ColorConstants.blackSecondaryColor
    }

    return(
        <>
            <stack.Navigator initialRouteName="Settings">
                <stack.Screen name="Settings" component={Settings} options={{headerShown: false}}/> 
                <stack.Screen
                    name="ProfileSetting"
                    options={{title: 'Profile', headerStyle: headerBgStyle, headerTintColor: ColorConstants.whiteMainColor, headerBackVisible: false}}>
                              
                    {(props) => <SubPage
                        renderContent={() => <ProfileSetting/>}
                        navigation={props.navigation} 
                    />}
                
                </stack.Screen> 
                <stack.Screen
                    name="LanguageSetting"
                    options={{title: 'Language', headerStyle: headerBgStyle, headerTintColor: ColorConstants.whiteMainColor, headerBackVisible: false}}>

                    {(props) => <SubPage
                        renderContent={() => <LanguageSetting/>}
                        navigation={props.navigation}
                    />}

                </stack.Screen>
                <stack.Screen
                    name="SecuritySetting"
                    options={{title: 'Sécurité', headerStyle: headerBgStyle, headerTintColor: ColorConstants.whiteMainColor, headerBackVisible: false}}>

                    {(props) => <SubPage
                        renderContent={() => <SecuritySetting/>}
                        navigation={props.navigation}
                    />}

                </stack.Screen>
                <stack.Screen
                    name="AboutSetting"
                    options={{title: 'A propos', headerStyle: headerBgStyle, headerTintColor: ColorConstants.whiteMainColor, headerBackVisible: false}}>

                    {(props) => <SubPage
                        renderContent={() => <AboutSetting/>}
                        navigation={props.navigation}
                    />}

                </stack.Screen>
                <stack.Screen
                    name="LegalNoticeSetting"
                    options={{title: 'Mentions légales', headerStyle: headerBgStyle, headerTintColor: ColorConstants.whiteMainColor, headerBackVisible: false}}>

                    {(props) => <SubPage
                        renderContent={() => <LegalNoticeSetting/>}
                        navigation={props.navigation}
                    />}

                </stack.Screen>
                <stack.Screen
                    name="SchoolProofSetting"
                    options={{title: 'Preuve de scolarité', headerStyle: headerBgStyle, headerTintColor: ColorConstants.whiteMainColor, headerBackVisible: false}}>

                    {(props) => <SubPage
                        renderContent={() => <SchoolProofSetting/>}
                        navigation={props.navigation}
                    />}

                </stack.Screen>
                <stack.Screen
                    name="MyPostSetting"
                    options={{title: 'Mes postes', headerStyle: headerBgStyle, headerTintColor: ColorConstants.whiteMainColor, headerBackVisible: false}}>

                    {(props) => <SubPage
                        renderContent={() => <MyPostSetting />}
                        navigation={props.navigation}
                    />}

                </stack.Screen>
            </stack.Navigator> 

        </>
    );
}

const Settings = () => {
    const authContext = useContext(Context);
    const navigation = useNavigation<any>();
    const storage = useStorage();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (authContext?.currentUser) {
            setIsLoading(false);
        }
    }, [authContext?.currentUser])

    const onPressLogout = () => {
        navigation.navigate("Login");
        authContext?.logout();
        storage.delete("token")
    }

    return (
            <View style={styles.container}>
                <Header style={styles.header}>
                    <MainText weight={'700'} fontSize={20} text={"Profile"} />    
                </Header>
                <NavigateButton
                    redirectScreenName="ProfileSetting"
                    style={styles.profileButton}
                    disabled={isLoading}>
                        {isLoading ? 
                        <Loading /> :
                        <UserWithPicture
                            userName={authContext?.currentUser?.firstName ?? ''}
                            extraText="Voir mon profile"
                            userNameFontSize={14}
                            extraTextFontSize={12}
                            pictureSize={39}
                            picture={authContext?.currentUser?.picturePath}/>
                        }
                </NavigateButton>
                <NavigateButton
                    redirectScreenName="SecuritySetting"
                    style={styles.button}
                    onPress={() => navigation.navigate("ResetPassword")}>
                        <MainText weight={'500'} fontSize={13} text={"Changer mon mot de passe"} />
                </NavigateButton>
                <NavigateButton
                    redirectScreenName="AboutSetting"
                    style={styles.button}>
                        <MainText weight={'500'} fontSize={13} text={"A propos"} />
                </NavigateButton>
                <NavigateButton
                    redirectScreenName="LegalNoticeSetting"
                    style={styles.button}>
                        <MainText weight={'500'} fontSize={13} text={"Mention légales"} />
                </NavigateButton>
                <NavigateButton
                    redirectScreenName="SchoolProofSetting"
                    style={styles.button}>
                        <MainText weight={'500'} fontSize={13} text={"Preuve de scolarité"} />
                </NavigateButton>
                <NavigateButton
                    redirectScreenName="MyPostSetting"
                    style={styles.button}>
                        <MainText weight={'500'} fontSize={13} text={"Mes postes"} />
                </NavigateButton>
                <View
                    style={styles.logoutContainer}>
                
                    <TouchableHighlight
                        onPress={onPressLogout}
                        underlayColor={ColorConstants.greyMainColor}
                        style={styles.button}>

                        <View style={styles.logoutButton}>
                            <MainText weight={'500'} fontSize={13} text={"Se déconnecter"} />
                        </View>

                    </TouchableHighlight>

                </View>
            </View>
        
    );
}

export default Profile;
