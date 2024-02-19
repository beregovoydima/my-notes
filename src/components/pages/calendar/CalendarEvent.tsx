import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from '@/assets/config/colors';

export function CalendarEvent({route}: {route: any}) {
  const {colors} = useTheme();

  return (
    <View>
      <Text style={{color: colors.text}}>Создание события</Text>
      <Text style={styles.text}>{route.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
});
