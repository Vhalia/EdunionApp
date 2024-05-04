import NavigateButton from "../../components/navigateButton/NavigateButton";
import { StyleProp, View, ViewStyle } from "react-native";
import MainText from "../../modules/text/MainText";
import UserWithPicture from "../../components/userWithPicture/UserWithPicture";
import styles from "./style/profileStyle";
import ProfileProps from "./props/profileProps";
import { useContext } from "react";
import Context from "../../contexts/AuthContext/AuthContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Setting from "./settings/Setting";
import LanguageSetting from "./settings/languageSetting/LanguageSetting";
import { ColorConstants } from "../../constants/ThemeConstants";
import SecuritySetting from "./settings/securitySetting/SecuritySetting";

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
                    options={{title: 'Profile', headerStyle: headerBgStyle, headerTintColor: ColorConstants.whiteMainColor}}>
                              
                    {() => <></>}
                
                </stack.Screen> 
                <stack.Screen
                    name="LanguageSetting"
                    options={{title: 'Language', headerStyle: headerBgStyle, headerTintColor: ColorConstants.whiteMainColor}}>

                    {() => <Setting
                        renderContent={() => <LanguageSetting/>}
                    />}

                </stack.Screen>
                <stack.Screen
                    name="SecuritySetting"
                    options={{title: 'Sécurité', headerStyle: headerBgStyle, headerTintColor: ColorConstants.whiteMainColor}}>

                    {() => <Setting
                        renderContent={() => <SecuritySetting/>}
                    />}

                </stack.Screen>
            </stack.Navigator> 

        </>
    );
}

const Settings = () => {
    const authContext = useContext(Context);

    return (
            <View style={styles.container}>
                <NavigateButton
                    redirectScreenName="ProfileSetting"
                    style={styles.profileButton}>
                        <UserWithPicture
                            userName={authContext!.currentUser?.name ?? ''}
                            extraText="Voir mon profile"
                            userNameFontSize={14}
                            extraTextFontSize={12}
                            pictureSize={39}/>
                </NavigateButton>
                <NavigateButton
                    redirectScreenName="LanguageSetting"
                    style={styles.button}>
                        <MainText weight={'500'} fontSize={13} text={"Langue"} />
                </NavigateButton>
                <NavigateButton
                    redirectScreenName="SecuritySetting"
                    style={styles.button}>
                        <MainText weight={'500'} fontSize={13} text={"Sécurité"} />
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
            </View>
        
    );
}

export default Profile;
