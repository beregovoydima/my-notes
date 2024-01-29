import React from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {useTheme} from '@/assets/config/colors';

export function SearchPage({route}: {route: any}) {
  const {colors} = useTheme();

  return (
    <>
      <View>
        <Appbar.Header style={{backgroundColor: colors.background}}>
          <Appbar.BackAction onPress={() => {}} />
          <Appbar.Content title={route.name} />
          <Appbar.Action icon="magnify" onPress={() => {}} />
        </Appbar.Header>
      </View>
    </>
  );
}
