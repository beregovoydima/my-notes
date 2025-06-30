import {useTheme} from '@/assets/config/colors';
import React from 'react';
import {useTranslation} from '@/core/i18n';
// import {NavBar} from '@/components/navigation/Navbar';
import {StyleSheet, Text, View} from 'react-native';

export function MainPage() {
  const {colors} = useTheme();
  const {t} = useTranslation();
  return (
    <View style={[styles.item, {backgroundColor: colors.background}]}>
      {/* <PaperProvider>
        <NavBar />
      </PaperProvider> */}
      <Text>{t('navigation.home')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {display: 'flex', flex: 1},
});
