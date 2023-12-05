import React, { ReactElement, ReactNode, useState } from 'react';
import {SafeAreaView,Text} from 'react-native';
import styles from './AppStyle';
import Home from './pages/home/Home';
import Header from './pages/header/Header';
import Navbar from './pages/navbar/Navbar';
import Search from './pages/search/Search';
import AddPost from './pages/addPost/AddPost';
import Messages from './pages/messages/Messages';
import Profile from './pages/profile/Profile';

function App(): JSX.Element {
  let [activePage, setActivePage] = useState<React.JSX.Element>(<Home />)

  return (
    <SafeAreaView style={styles.background}>
      <Header></Header>
      {activePage}
      <Navbar
        onPressHome={() => setActivePage(<Home />)}
        onPressSearch={() => setActivePage(<Search />)}
        onPressAdd={() => setActivePage(<AddPost />)}
        onPressMessages={() => setActivePage(<Messages />)}
        onPressProfile={() => setActivePage(<Profile />)} />
    </SafeAreaView>
  );
}

export default App;
