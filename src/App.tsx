import React, { Profiler, ReactElement, ReactNode, useState } from 'react';
import {SafeAreaView,Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from './AppStyle';
import Home from './pages/home/Home';
import Header from './pages/header/Header';
import Navbar from './pages/navbar/Navbar';
import Search from './pages/search/Search';
import AddPost from './pages/addPost/AddPost';
import Messages from './pages/messages/Messages';
import Profile from './pages/profile/Profile';
import Login from './pages/login/Login';
import { AuthContext } from './contexts/AuthContext/AuthContext';
import { ColorConstants } from './constants/ThemeConstants';

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

          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext>
    </SafeAreaView>
  );
}

export default App;

export type { StackNavigationList };
