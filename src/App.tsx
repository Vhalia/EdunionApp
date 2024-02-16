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
  let [activePageName, setActivePageName] = useState<string>('Home')

  const displayActivePage = () => {
    switch (activePageName) {
      case 'Home':
        return <Home />
      case 'Search':
        return <Search />
      case 'AddPost':
        return <AddPost />
      case 'Messages':
        return <Messages />
      case 'Profile':
        return <Profile />
    }
  }

  return (
    <SafeAreaView style={styles.background}>
      {displayActivePage()}
      <Navbar
        onPressHome={() => setActivePageName('Home')}
        onPressSearch={() => setActivePageName('Search')}
        onPressAdd={() => setActivePageName('AddPost')}
        onPressMessages={() => setActivePageName('Messages')}
        onPressProfile={() => setActivePageName('Profile')} />
    </SafeAreaView>
  );
}

export default App;
