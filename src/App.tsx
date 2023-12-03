import React from 'react';
import {SafeAreaView,Text} from 'react-native';
import styles from './AppStyle';
import Home from './pages/home/Home';
import Header from './pages/header/Header';
import Navbar from './pages/navbar/Navbar';

function App(): JSX.Element {

  return (
    <SafeAreaView style={styles.background}>
      <Header></Header>
      <Home></Home>
      <Navbar></Navbar>
    </SafeAreaView>
  );
}

export default App;
