import React, { useEffect, useState } from 'react';
import {SafeAreaView, View} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from './AppStyle';
import Navbar from './pages/navbar/Navbar';
import Login from './pages/login/Login';
import { AuthContext } from './contexts/AuthContext/AuthContext';
import Post from './components/post/Post';
import PostEdit from './components/postEdit/PostEdit';
import SubPage from './components/subPage/SubPage';
import Register from './pages/register/Register';
import { ColorConstants } from './constants/ThemeConstants';
import Toast, { ErrorToast, InfoToast, ToastConfig } from 'react-native-toast-message';
import ResetPassword from './pages/resetPassword/ResetPassword';
import ConfirmEmail from './pages/confirmEmail/ConfirmEmail';
import SplashScreen from './pages/splashScreen/SplashScreen';
import Chat from './pages/chat/Chat';
import TimezoneContext, { TimezoneContextComponent } from './contexts/TimezoneContext/TimezoneContext';
import EditPostPage from './pages/editPost/EditPostPage';
import Config from "react-native-config";
import EnvBanner from './components/envBanner/EnvBanner';

const Stack = createNativeStackNavigator();

type StackNavigationList = {
  Home: undefined;
  Search: undefined;
  AddPost: undefined;
  Messages: undefined;
  Profile: undefined;
  Login: undefined;
  Navbar: undefined;
};

function App(): JSX.Element { 
  const toastConfig : ToastConfig = {
    error: (props) => (
      <ErrorToast
        {...props}
        style={{
          backgroundColor: ColorConstants.red,
          borderLeftColor: ColorConstants.red70PercentColor
        }}
        text1Style={{
          color: ColorConstants.whiteMainColor,
          fontSize: 15
        }}
        text2Style={{
          color: ColorConstants.whiteMainColor,
          opacity: 0.7,
          fontSize: 14,
        }}
        text2NumberOfLines={2}
        />
    ),
    info: (props) => (
      <InfoToast
        {...props}
        style={{
          backgroundColor: ColorConstants.blue,
          borderLeftColor: ColorConstants.blue70PercentColor
        }}
        text1Style={{
          color: ColorConstants.whiteMainColor,
          fontSize: 15,
        }}
        text2Style={{
          color: ColorConstants.whiteMainColor,
          opacity: 0.7,
          fontSize: 14,
        }}
        text2NumberOfLines={2}
        />
    ),
    success : (props) => (
      <InfoToast
        {...props}
        style={{
          backgroundColor: ColorConstants.green,
          borderLeftColor: ColorConstants.green70PercentColor
        }}
        text1Style={{
          color: ColorConstants.whiteMainColor,
          fontSize: 15
        }}
        />
    )
  }

  return (
    <SafeAreaView style={styles.background}>
      <AuthContext>
        <TimezoneContextComponent>
          <NavigationContainer>
            <Stack.Navigator initialRouteName={'SplashScreen'}>
                <Stack.Screen name='SplashScreen' component={SplashScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
                <Stack.Screen
                  name="Register"
                  component={Register}
                  options={{
                    title: 'Inscription',
                    headerStyle: {backgroundColor: ColorConstants.blackSecondaryColor},
                    headerTintColor: ColorConstants.whiteMainColor
                  }}/>
                <Stack.Screen
                  name="ResetPassword"
                  component={ResetPassword}
                  options={{
                    title: 'Reinitialisation du mot de passe',
                    headerStyle: {backgroundColor: ColorConstants.blackSecondaryColor},
                    headerTintColor: ColorConstants.whiteMainColor
                  }}/>
                <Stack.Screen name="ConfirmEmail" component={ConfirmEmail} options={{headerShown: false}}/>
                <Stack.Screen name="Navbar" component={Navbar} options={{headerShown: false}} />
                <Stack.Screen name="Post" options={{headerShown: false}}>
                  {(props) => <SubPage
                    navigation={props.navigation}
                    renderContent={() =><Post />}
                    mode='fullscreen'
                    backButtonPosition='absolute'/>}
                </Stack.Screen>
                <Stack.Screen name="PostEdit" options={{headerShown: false}}>
                  {(props) => <SubPage
                    navigation={props.navigation}
                    renderContent={() =><EditPostPage />}
                    mode='fullscreen'/>}
                </Stack.Screen>
                <Stack.Screen name="Chat" options={{headerShown: false}}>
                  {(props) => <SubPage
                    navigation={props.navigation}
                    renderContent={() =><Chat />}
                    mode='fullscreen'
                    backButtonPosition='absolute'/>}
                </Stack.Screen>
            </Stack.Navigator>
          </NavigationContainer>
        </TimezoneContextComponent>
      </AuthContext>
      <Toast config={toastConfig}/>
      <EnvBanner />
    </SafeAreaView>
  );
}

export default App;

export type { StackNavigationList };
