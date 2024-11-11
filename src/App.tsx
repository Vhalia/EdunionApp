import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from './AppStyle';
import Navbar from './pages/navbar/Navbar';
import Login from './pages/login/Login';
import { AuthContext } from './contexts/AuthContext/AuthContext';
import Post from './components/post/Post';
import SubPage from './components/subPage/SubPage';
import Register from './pages/register/Register';
import { ColorConstants } from './constants/ThemeConstants';
import ResetPassword from './pages/resetPassword/ResetPassword';
import ConfirmEmail from './pages/confirmEmail/ConfirmEmail';
import SplashScreen from './pages/splashScreen/SplashScreen';
import Chat from './pages/chat/Chat';
import { TimezoneContextComponent } from './contexts/TimezoneContext/TimezoneContext';
import EditPostPage from './pages/editPost/EditPostPage';
import EnvBanner from './components/envBanner/EnvBanner';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Popup from './modules/Popup/Popup';

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

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider style={[styles.background]}>
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
      <Popup />
      <EnvBanner />
    </SafeAreaProvider>
  )
}

export default App;

export type { StackNavigationList };
