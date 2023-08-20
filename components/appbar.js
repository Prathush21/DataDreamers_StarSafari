import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';

const TransparentAppBar = () => (
  <View style={styles.appBarContainer}>
    <Appbar.Header style={styles.transparentAppBar}>
      <Appbar.Action icon="menu" onPress={() => {}} />
      <Appbar.Content title="Star Safari" titleStyle={styles.title} />
      <Appbar.Action icon="magnify" onPress={() => {}} />
    </Appbar.Header>
  </View>

);

const styles = StyleSheet.create({
  appBarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  transparentAppBar: {
    backgroundColor: 'rgba(0, 0, 0, 0)', // Fully transparent
  },
  title: {
    color: 'white',
  },
});

export default TransparentAppBar;
