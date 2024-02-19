import styles from "./style/style";
import SearchSvg from "../../../images/search.svg"
import HomeSvg from "../../../images/home.svg"
import ProfileSvg from "../../../images/profile.svg"
import AddSvg from "../../../images/add.svg"
import ChatSvg from "../../../images/chat.svg"
import NavbarProps from "./props/props";
import { ReactNode, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from '../home/Home';
import Search from '../search/Search';
import AddPost from '../addPost/AddPost';
import Messages from '..//messages/Messages';
import Profile from '..//profile/Profile';
import { ColorConstants } from "../../constants/ThemeConstants";

const Navbar = (props : NavbarProps) => {
    const Tab = createBottomTabNavigator()

    const activeStyle = {
        icon : {color:"#6D0FF2", opacity:1}
    }
    const unactiveStyle = {
        icon : {color:"#ffff", opacity:0.6}
    }

    const displayIcon = (routeName : string, focused : boolean) : ReactNode => {
        switch(routeName){
            case 'Home':
                return <HomeSvg {... focused ? activeStyle.icon : unactiveStyle.icon}/>
            case 'Search':
                return <SearchSvg {... focused ? activeStyle.icon : unactiveStyle.icon}/>
            case 'AddPost':
                return <AddSvg {...unactiveStyle.icon}/>
            case 'Messages':
                return <ChatSvg {... focused ? activeStyle.icon : unactiveStyle.icon}/>
            case 'Profile':
                return <ProfileSvg {... focused ? activeStyle.icon : unactiveStyle.icon}/>
        }
    }

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

                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Search" component={Search} />
                <Tab.Screen name="AddPost" component={AddPost} />
                <Tab.Screen name="Messages" component={Messages} />
                <Tab.Screen name="Profile" component={Profile} />

        </Tab.Navigator>
    );
}

export default Navbar