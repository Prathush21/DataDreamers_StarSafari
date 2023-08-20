import * as React from 'react';
import { Appbar } from 'react-native-paper';

const AppBar = () => (
  <Appbar.Header dark = {true } style={{backgroundColor: 'black'}}>
    <Appbar.Action color = 'white' icon="menu" onPress={() => {}} />

    <Appbar.Content color = 'white' title="Star Safari"/>
    <Appbar.Action color = 'white' icon="magnify" onPress={() => {}} />
  </Appbar.Header>
);

export default AppBar;