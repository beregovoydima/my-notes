import {useTheme} from '@/assets/config/colors';
import React from 'react';
// import {NavBar} from '@/components/navigation/Navbar';
import {StyleSheet, Text, View} from 'react-native';

export function MainPage() {
  const {colors} = useTheme();
  return (
    <View style={[styles.item, {backgroundColor: colors.background}]}>
      {/* <PaperProvider>
        <NavBar />
      </PaperProvider> */}
      <Text>qweqwe</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {display: 'flex', flex: 1},
});
