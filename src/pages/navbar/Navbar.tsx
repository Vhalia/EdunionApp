import styles from "./style/style";
import SearchSvg from "../../../images/search.svg"
import HomeSvg from "../../../images/home.svg"
import ProfileSvg from "../../../images/profile.svg"
import AddSvg from "../../../images/add.svg"
import ChatSvg from "../../../images/chat.svg"
import BagSvg from "../../../images/bag.svg"
import NavbarProps from "./props/props";
import { ReactNode, useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from '../home/Home';
import Search from '../search/Search';
import AddPost from '../addPost/AddPost';
import PurchasesAndMyPosts from '../purchasesAndMyPosts/PurchasesAndMyPosts';
import Profile from '..//profile/Profile';
import { ColorConstants } from "../../constants/ThemeConstants";
import { useNavigation } from "@react-navigation/native";

const Navbar = (props : NavbarProps) => {
    const Tab = createBottomTabNavigator()
    const navigation = useNavigation<any>()

    const activeStyle = {
        icon : {color:ColorConstants.purpleMainColor, opacity:1}
    }
    const unactiveStyle = {
        icon : {color:"#ffff", opacity:0.6}
    }

    const iconSize = 30

    const displayIcon = (routeName : string, focused : boolean) : ReactNode => {
        switch(routeName){
            case 'Home':
                return <HomeSvg {... focused ? activeStyle.icon : unactiveStyle.icon}/>
            case 'Search':
                return <SearchSvg {... focused ? activeStyle.icon : unactiveStyle.icon}/>
            case 'Add':
                return <AddSvg {... focused ? activeStyle.icon : unactiveStyle.icon} color={ColorConstants.purpleMainColor}/>
            case 'Management':
                return <BagSvg {... focused ? activeStyle.icon : unactiveStyle.icon} width={iconSize} height={iconSize}/>
            case 'Profile':
                return <ProfileSvg {... focused ? activeStyle.icon : unactiveStyle.icon}/>
        }
    }

    useEffect(() => {
        //prevent going back
        navigation.addListener('beforeRemove', (e: any) => {
            if (e.data.action.type !== 'NAVIGATE')
                e.preventDefault();
        })
    }, [navigation]);
    
    return (
        <Tab.Navigator
            initialRouteName='Home'
            sceneContainerStyle={styles.mainView}
            screenOptions={({route}) => ({
                headerShown: false,
                tabBarStyle: styles.mainView,
                tabBarIcon: ({focused}) => displayIcon(route.name, focused),
                tabBarActiveTintColor: ColorConstants.whiteMainColor,
            })}>

                <Tab.Screen name="Home" component={Home} options={{title: 'Accueil'}}/>
                <Tab.Screen name="Search" component={Search} options={{title: 'Chercher'}}/>
                <Tab.Screen name="Add" component={AddPost} options={{title: 'Ajouter'}}/>
                <Tab.Screen name="Management" component={PurchasesAndMyPosts} options={{title: 'Gestion'}}/>
                <Tab.Screen name="Profile" component={Profile} options={{title: 'Profile'}}/>
        </Tab.Navigator>
    );
}

export default Navbar