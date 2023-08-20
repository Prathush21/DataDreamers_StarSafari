import * as React from 'react';
import { Appbar } from 'react-native-paper';

const AppBar = () => (
  <Appbar.Header style={{backgroundColor: 'rgba(246, 250, 253, 0.5)'}}>
    <Appbar.Action icon="menu" onPress={() => {}} />

    <Appbar.Content title="Star Safari" />
    <Appbar.Action icon="magnify" onPress={() => {}} />
  </Appbar.Header>
);

export default AppBar;