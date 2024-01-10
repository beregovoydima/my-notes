import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '@/assets/config/colors';

export const NavBar = () => {
  const navigateTo = () => {};

  return (
    <View style={styles.navbar}>
      <View style={styles.navbar}>
        <Text style={styles.navbarText} onPress={navigateTo}>
          {colors.lightGrey}
        </Text>
      </View>
      <View style={styles.navbarItem}>
        <Text style={styles.navbarText} onPress={navigateTo}>
          Заметки
        </Text>
      </View>
      <View style={styles.navbar}>
        <Text style={styles.navbarText} onPress={navigateTo}>
          Заметки
        </Text>
      </View>
      <View style={styles.navbar}>
        <Text style={styles.navbarText} onPress={navigateTo}>
          Заметки
        </Text>
      </View>
      <View style={styles.navbar}>
        <Text style={styles.navbarText} onPress={navigateTo}>
          Заметки
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70,
    backgroundColor: colors.lightGrey,
  },
  navbarItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navbarItemImage: {
    width: 20,
    height: 20,
  },
  navbarText: {
    color: 'white',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
