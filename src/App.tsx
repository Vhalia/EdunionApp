import React from 'react';
import {SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from './AppStyle';
import Navbar from './pages/navbar/Navbar';
import Login from './pages/login/Login';
import { AuthContext } from './contexts/AuthContext/AuthContext';
import Post from './components/post/Post';
import PostEdit from './components/postEdit/PostEdit';
import SubPage from './components/subPage/SubPage';

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

  return (
    <SafeAreaView style={styles.background}>
      <AuthContext>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login" screenOptions={
            {
              headerShown: false
            }}>

              <Stack.Screen name="Login" component={Login}/>
              <Stack.Screen name="Navbar" component={Navbar} />
              <Stack.Screen name="Post" component={Post}/>
              <Stack.Screen name="PostEdit">
                {(props) => <SubPage
                  navigation={props.navigation}
                  renderContent={() =><PostEdit />}
                  mode='fullscreen'/>}
              </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext>
    </SafeAreaView>
  );
}

export default App;

export type { StackNavigationList };
