import React, { ReactElement, ReactNode, useState } from 'react';
import {SafeAreaView,Text} from 'react-native';
import styles from './AppStyle';
import Home from './pages/home/Home';
import Header from './pages/header/Header';
import Navbar from './pages/navbar/Navbar';
import Search from './pages/search/Search';

function App(): JSX.Element {
  let [activePage, setActivePage] = useState<React.JSX.Element>(<Home />)

  return (
    <SafeAreaView style={styles.background}>
      <Header></Header>
      {activePage}
      <Navbar
        onPressHome={() => setActivePage(<Home />)}
        onPressSearch={() => setActivePage(<Search />)}
        onPressAdd={() => {}}
        onPressMessages={() => {}}
        onPressProfile={() => {}} />
    </SafeAreaView>
  );
}

export default App;
