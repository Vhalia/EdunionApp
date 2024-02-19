import { Text, View } from "react-native"
import Context from "../../contexts/AuthContext/AuthContext";
import { useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { StackNavigationList } from "../../App";

const Login = () => {
    const authContext = useContext(Context);
    const navigation = useNavigation<NativeStackNavigationProp<StackNavigationList>>();
    
    useEffect(() => {
        authContext!.setCurrentUser({
            name: 'Max le Grelle ff',
            id: 1
        })
        navigation.navigate('Navbar')
    }, [])

    return (
        <View>
            <Text>Login</Text>
        </View>
    )
}

export default Login