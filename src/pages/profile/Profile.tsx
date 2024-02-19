import NavigateButton from "../../components/navigateButton/NavigateButton";
import { View } from "react-native";
import MainText from "../../modules/text/MainText";
import UserWithPicture from "../../components/userWithPicture/UserWithPicture";
import styles from "./style/profileStyle";
import ProfileProps from "./props/profileProps";
import { useContext } from "react";
import Context from "../../contexts/AuthContext/AuthContext";

const Profile = (props : ProfileProps) => {
    const authContext = useContext(Context);

    return(
        <View style={styles.container}>
            <NavigateButton
                onPress={() => {}}
                style={styles.profileButton}>
                    <UserWithPicture
                        userName={authContext!.currentUser?.name ?? ''}
                        extraText="Voir mon profile"
                        userNameFontSize={15}
                        extraTextFontSize={13}
                        pictureSize={40}/>
            </NavigateButton>
            <NavigateButton
                onPress={() => {}}
                style={styles.button}>
                    <MainText weight={'500'} fontSize={13} text={"Mes ventes"} />
            </NavigateButton>
            <NavigateButton
                onPress={() => {}}
                style={styles.button}>
                    <MainText weight={'500'} fontSize={13} text={"Mes achats"} />
            </NavigateButton>
            <NavigateButton
                onPress={() => {}}
                style={styles.button}>
                    <MainText weight={'500'} fontSize={13} text={"Paramètres"} />
            </NavigateButton>
            <NavigateButton
                onPress={() => {}}
                style={styles.button}>
                    <MainText weight={'500'} fontSize={13} text={"A propos"} />
            </NavigateButton>
            <NavigateButton
                onPress={() => {}}
                style={styles.button}>
                    <MainText weight={'500'} fontSize={13} text={"Mention légales"} />
            </NavigateButton>

        </View>
    );
}

export default Profile;
