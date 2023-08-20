import * as React from 'react';
import { Appbar } from 'react-native-paper';

const AppBar = () => (
  <Appbar.Header style={{backgroundColor:'#F6FAFD'}}>
    {/* <Appbar.BackAction onPress={() => {}} /> */}
    <Appbar.Action icon="menu" onPress={() => {}} />

    <Appbar.Content title="Star Safari" />
    <Appbar.Action icon="magnify" onPress={() => {}} />
  </Appbar.Header>
);

export default AppBar;