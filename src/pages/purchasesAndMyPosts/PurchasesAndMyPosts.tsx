import { View } from "react-native";
import MainText from "../../modules/text/MainText";
import { ColorConstants } from "../../constants/ThemeConstants";
import Header from "../../components/header/Header";
import PurchasesAndSalesProps from "./props/PurchasesAndSalesProps";
import style from "./style/PurchasesAndSalesStyle";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Purchases from "./Purchases/Purchases";
import MyPosts from "./MyPosts/MyPosts";
import NavigateButton from "../../components/navigateButton/NavigateButton";
import SubPage from "../../components/subPage/SubPage";

const PurchasesAndSales = (props : PurchasesAndSalesProps) => {
    var stack = createNativeStackNavigator();
    return (
        <stack.Navigator>
            <stack.Screen
                name="PurchasesAndMyPostsMainScreen"
                component={PurchasesAndMyPostsMainScreen}
                options={{headerShown: false}}/>
            <stack.Screen
                name="Purchases" 
                options={{title: 'Mon historique', headerStyle: {backgroundColor: ColorConstants.blackSecondaryColor}, headerTintColor: ColorConstants.whiteMainColor, headerBackVisible: false}}>
                
                {(props) => <SubPage
                    renderContent={() => <Purchases />}
                    navigation={props.navigation}/>}

            </stack.Screen>
            <stack.Screen
                name="MyPosts"
                options={{title: 'Mes postes', headerStyle: {backgroundColor: ColorConstants.blackSecondaryColor}, headerTintColor: ColorConstants.whiteMainColor, headerBackVisible: false}}>
                
                {(props) => <SubPage
                    renderContent={() => <MyPosts />}
                    navigation={props.navigation}/>}

            </stack.Screen>
        </stack.Navigator>
    )
}

const PurchasesAndMyPostsMainScreen = () => {
    return(
        <>
            <Header style={style.header}>
                <MainText weight={'700'} fontSize={20} text="Gestion" />
            </Header>
            
            <View style={style.contentContainer}>
                <View style={style.content}>
                    <NavigateButton redirectScreenName="Purchases" style={style.bigGap}>
                        <MainText weight={'500'} fontSize={13} text="Mon historique" />
                    </NavigateButton>
                    <NavigateButton redirectScreenName="MyPosts" style={style.gap}>
                        <MainText weight={'500'} fontSize={13} text="Mes postes" />
                    </NavigateButton>
                </View>
            </View>
        </>
    );
}

export default PurchasesAndSales;