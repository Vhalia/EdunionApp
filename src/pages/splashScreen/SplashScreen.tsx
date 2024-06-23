import { View } from "react-native"
import LogoSVG from "../../../images/logo.svg"
import { ColorConstants } from "../../constants/ThemeConstants"
import useStorage from "../../hooks/useStorage";
import { useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Context from "../../contexts/AuthContext/AuthContext";

const SplashScreen = () => {
    const storage = useStorage();
    const navigation = useNavigation<any>();
    const authContext = useContext(Context)

    useEffect(() => {
        storage.get<string>("token")
            .then(token => {
                authContext!.setToken(token)
                
                if (token){
                    navigation.navigate("Navbar")
                }else{
                    navigation.navigate("Login")
                }
            })
    }, [])
    

    return (
        <View style={{
            display: "flex", 
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            backgroundColor: ColorConstants.blackMainColor}}>

            <LogoSVG width={200} height={200}/>

        </View>
    )
}

export default SplashScreen